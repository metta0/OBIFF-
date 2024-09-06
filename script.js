document.addEventListener('DOMContentLoaded', () => {
    const movieLinks = document.querySelectorAll('.movie-link');
    const modal = document.getElementById('movieModal');
    const closeBtn = document.querySelector('.close');
    const pdfContainer = document.getElementById('pdfContainer');
    const modalTrailer = document.getElementById('modalTrailer');
    // 현재 URL에서 서버 주소를 동적으로 가져오기
    const serverURL = `${window.location.protocol}//${window.location.host}`;

    movieLinks.forEach(link => {
        link.addEventListener('click', async (event) => {
            
            event.preventDefault();
            // PDF 파일 경로 설정 (현재 서버 주소에 기반)
            const pdfPath = `${serverURL}/File/moviePamphlet.pdf`;
            const loadingTask = pdfjsLib.getDocument(pdfPath);
            const pdf = await loadingTask.promise;

            const pagesNumber = link.getAttribute('data-page')
                                    .split(',')
                                    .map(page => parseInt(page, 10));

            //페이지 가져오기
            for (const pageNumber of pagesNumber){
                await renderPage(pageNumber, pdf)
            }

            // 여기에 영화 정보와 트레일러 URL을 설정
            const trailer = link.getAttribute('data-trailer');
            if(trailer != ''){
                modalTrailer.innerHTML = `
                <div class="video-container">
                    <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/${trailer}"
                    title="YouTube video player" 
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                    </iframe>
                </div>`;
            }

            modal.style.display = 'block';
        });
    });

    // 페이지 렌더링 함수
    async function renderPage(pageNumber, pdf) {
        const page = await pdf.getPage(pageNumber);
                
        // 캔버스 설정
        const viewport = page.getViewport({ scale: 1.9 });
        const pdfCanvas = document.createElement('canvas');
        pdfCanvas.width = viewport.width;
        pdfCanvas.height = viewport.height

        // 페이지 렌더링
        const ctx = pdfCanvas.getContext('2d');
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        await page.render(renderContext).promise;

        pdfContainer.appendChild(pdfCanvas);
    }

    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click',closeModalOnClickOutside);

    function closeModalOnClickOutside(event) {
        // 클릭한 요소가 모달 콘텐츠가 아닌 경우
        if (event.target === modal) {
            closeModal();
        }
    }

    function closeModal(){
        modal.style.display = 'none';
        
        while (pdfContainer.firstChild) {
            pdfContainer.removeChild(pdfContainer.firstChild);
        }

        const iframe = modalTrailer.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }

    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
        
    });
});
