export const scrollToProducts = () => {
  const productsSection = document.getElementById('products-section');
  if (productsSection) {
    const headerHeight = 64; // Fixed header height
    const elementPosition = productsSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};