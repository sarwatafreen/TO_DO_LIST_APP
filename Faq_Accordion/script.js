// function toggle(el) {
//   let ans = el.nextElementSibling;
//   ans.style.display = ans.style.display === "block" ? "none" : "block";
// }    


// FAQ Accordion JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            
            // Agar already open hai to band kar do
            const isActive = item.classList.contains('active');

            // Pehle sab band kar do (Accordion style - sirf ek khule)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Agar pehle se band tha to khol do
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});