const paging = (page, totalProducts) => {
    const maxProducts = 12; // 한 페이지에 표시하는 최대 상품 수
    const maxPage = 5; // 한 페이지에 표시하는 최대 페이지 수 1~5, 6~10         안쓸듯
    let currentPage = page ? parseInt(page) : 1; // 현재 페이지
    const hideProducts = page === 1 ? 0 : (page - 1) * maxProducts; // 숨길 페이지
    const totalPage = Math.ceil(totalProducts / maxProducts); // 총 페이지 수
    
    if (currentPage > totalPage) { // URL 접근 수정
      currentPage = totalPage;
    }
  
    const startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1; // 시작 페이지         안쓸듯
    let endPage = startPage + maxPage - 1; // 끝 페이지         안쓸듯
  
    if (endPage > totalPage) { // 끝 페이지 수정         안쓸듯
      endPage = totalPage;
    }
  
    return { startPage, endPage, hideProducts, maxProducts, totalPage, currentPage };
  };
  
module.exports = paging;