document.addEventListener('DOMContentLoaded', function() {

    // --- STICKY HEADER ---
    const header = document.getElementById('main-header');
    const heroSectionHeight = document.getElementById('hero') ? document.getElementById('hero').offsetHeight : 300;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Atau heroSectionHeight / 2 atau nilai spesifik
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('header .nav-links');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        // Close menu when a link is clicked (optional for single-page sites)
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // --- SCROLL REVEAL ANIMATION ---
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if data-delay attribute exists
                const delay = entry.target.dataset.delay;
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, parseInt(delay.replace('s', '') * 1000));
                } else {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- TESTIMONIAL CAROUSEL ---
    const carousel = document.querySelector('.testimonial-carousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (carousel && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        const dots = document.querySelectorAll('.dot');

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });
        }
        
        // Initialize
        updateCarousel();

        // Auto-play (optional)
        // let autoPlayInterval = setInterval(() => {
        //     currentIndex = (currentIndex + 1) % totalSlides;
        //     updateCarousel();
        // }, 5000);

        // carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        // carousel.addEventListener('mouseleave', () => {
        //     autoPlayInterval = setInterval(() => {
        //         currentIndex = (currentIndex + 1) % totalSlides;
        //         updateCarousel();
        //     }, 5000);
        // });
    }


    // --- NEWSLETTER FORM (Placeholder) ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Terima kasih! ${emailInput.value} telah berhasil didaftarkan.`);
                emailInput.value = '';
            } else {
                alert('Mohon masukkan alamat email yang valid.');
            }
        });
    }

    // --- UPDATE COPYRIGHT YEAR ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});

// Tambahkan ini di dalam DOMContentLoaded event listener di script.js

// ... (kode JS yang sudah ada) ...

// BLOG PAGE - Filter/Sort (Placeholder)
const blogSortSelect = document.querySelector('.blog-sidebar select[name="sort_by"]');
if (blogSortSelect) {
    blogSortSelect.addEventListener('change', function() {
        console.log('Sort by:', this.value);
        // Di sini Anda akan menambahkan logika untuk memuat ulang artikel
        // atau memfilter artikel yang sudah ada (jika semua dimuat di frontend)
    });
}

const categoryLinks = document.querySelectorAll('.category-list a');
categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.textContent.split('(')[0].trim();
        console.log('Filter by category:', category);
        // Logika filter
    });
});

const tagLinks = document.querySelectorAll('.tag-cloud a');
tagLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const tag = this.textContent.trim();
        console.log('Filter by tag:', tag);
        // Logika filter
    });
});


// ARTICLE DETAIL PAGE - Share Buttons (Contoh)
const shareLinks = document.querySelectorAll('.article-share-buttons a');
shareLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.getAttribute('aria-label').replace('Bagikan ke ', '').replace('Salin Tautan', 'link');
        const urlToShare = window.location.href;
        let shareUrl = '';

        switch(platform.toLowerCase()) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
                break;
            case 'twitter':
                const text = document.title;
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(text)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(document.title + " " + urlToShare)}`;
                break;
            case 'link':
                navigator.clipboard.writeText(urlToShare).then(() => {
                    alert('Tautan berhasil disalin!');
                }).catch(err => {
                    console.error('Gagal menyalin tautan: ', err);
                    alert('Gagal menyalin tautan.');
                });
                return; // Keluar dari fungsi karena tidak membuka window baru
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
        console.log(`Share to ${platform}: ${urlToShare}`);
    });
});

// ARTICLE DETAIL PAGE - Comment Form (Placeholder)
const commentForm = document.getElementById('comment-form');
if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const commentText = document.getElementById('comment-text').value;
        const commentName = document.getElementById('comment-name').value;
        const commentEmail = document.getElementById('comment-email').value;

        if (commentText && commentName && commentEmail) {
            console.log('New Comment:', {
                text: commentText,
                name: commentName,
                email: commentEmail
            });
            alert('Komentar Anda telah terkirim (simulasi).');
            this.reset(); // Kosongkan form
        } else {
            alert('Mohon lengkapi semua kolom komentar.');
        }
    });
}

// Tambahkan ini di dalam DOMContentLoaded event listener di script.js

// ... (kode JS yang sudah ada untuk header, scroll, dll.) ...

// === CATALOG PAGE ===
const categoryLinksCatalog = document.querySelectorAll('.category-filter-list a');
const productCardsCatalog = document.querySelectorAll('.product-card-catalog'); // Jika semua produk dimuat

categoryLinksCatalog.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        categoryLinksCatalog.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const selectedCategory = this.dataset.category;

        // Placeholder filter logic (jika semua produk ada di DOM)
        productCardsCatalog.forEach(card => {
            if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                card.style.display = 'flex'; // atau 'grid' tergantung display produk card
            } else {
                card.style.display = 'none';
            }
        });
        console.log('Filter by category:', selectedCategory);
    });
});

// "Add to Cart" button on catalog (placeholder)
const quickAddToCartBtns = document.querySelectorAll('.add-to-cart-btn');
quickAddToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const productId = this.dataset.productId;
        alert(`Produk ID ${productId} ditambahkan ke keranjang (simulasi).`);
        // Update cart count in header (simulasi)
        updateCartCount(1); // Tambah 1
    });
});


// === PRODUCT DETAIL PAGE ===
// Image Gallery
const mainProductImage = document.getElementById('mainProductImage');
const thumbnailItems = document.querySelectorAll('.thumbnail-item:not(.video-thumb)');
const videoThumb = document.querySelector('.video-thumb');
const videoModal = document.getElementById('videoModal');
const productVideoFrame = document.getElementById('productVideoFrame');
const closeModalBtn = document.querySelector('.close-modal-btn');

if (mainProductImage && thumbnailItems.length > 0) {
    thumbnailItems.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainProductImage.src = this.dataset.image;
            mainProductImage.alt = this.alt; // Update alt text
            thumbnailItems.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}
// Video Modal
if (videoThumb && videoModal && productVideoFrame && closeModalBtn) {
    videoThumb.addEventListener('click', function() {
        const videoSrc = this.dataset.videoSrc;
        if (videoSrc) {
            // Auto-add autoplay; enablejsapi=1
            let finalVideoSrc = videoSrc;
            if (videoSrc.includes('youtube.com/embed/')) {
                finalVideoSrc += (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1&enablejsapi=1';
            }
            productVideoFrame.src = finalVideoSrc;
            videoModal.style.display = 'flex';
        }
    });
    closeModalBtn.addEventListener('click', function() {
        videoModal.style.display = 'none';
        productVideoFrame.src = ''; // Stop video
    });
    window.addEventListener('click', function(event) { // Close on outside click
        if (event.target == videoModal) {
            videoModal.style.display = 'none';
            productVideoFrame.src = ''; // Stop video
        }
    });
}

// Quantity Selector (Detail & Cart)
function setupQuantitySelectors(containerSelector) {
    const quantityContainers = document.querySelectorAll(containerSelector);
    quantityContainers.forEach(container => {
        const minusBtn = container.querySelector('.quantity-btn.minus');
        const plusBtn = container.querySelector('.quantity-btn.plus');
        const quantityInput = container.querySelector('input[type="number"]');
        const maxStock = parseInt(quantityInput.getAttribute('max')) || 99; // Max stok

        if(minusBtn && plusBtn && quantityInput){
            minusBtn.addEventListener('click', () => {
                let currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                    quantityInput.dispatchEvent(new Event('change')); // Trigger change for cart updates
                }
            });
            plusBtn.addEventListener('click', () => {
                let currentValue = parseInt(quantityInput.value);
                if (currentValue < maxStock) { // Batasi dengan stok
                    quantityInput.value = currentValue + 1;
                    quantityInput.dispatchEvent(new Event('change'));
                }
            });
            quantityInput.addEventListener('change', () => { // Pastikan tidak melebihi max/min manual
                let val = parseInt(quantityInput.value);
                if (isNaN(val) || val < 1) quantityInput.value = 1;
                if (val > maxStock) quantityInput.value = maxStock;
                // Panggil fungsi update subtotal jika ini di halaman keranjang
                if (container.closest('.cart-item-row')) {
                    updateCartItemSubtotal(container.closest('.cart-item-row'));
                }
            });
        }
    });
}
setupQuantitySelectors('.quantity-selector'); // Untuk Product Detail & Cart

// Tabs on Product Detail
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');
if (tabLinks.length > 0) {
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });
}

// "Add to Cart" button on Detail Page (placeholder)
const detailAddToCartBtn = document.querySelector('.btn-add-to-cart-detail');
if (detailAddToCartBtn) {
    detailAddToCartBtn.addEventListener('click', function() {
        const quantity = document.getElementById('quantity') ? document.getElementById('quantity').value : 1;
        alert(`Ditambahkan ${quantity} item ke keranjang (simulasi).`);
        updateCartCount(parseInt(quantity));
    });
}


// === CART PAGE ===
const cartItemRows = document.querySelectorAll('.cart-item-row');
const cartIsEmptyMessage = document.getElementById('cartIsEmptyMessage');
const cartHasItems = document.getElementById('cartHasItems');
const cartCountHeader = document.getElementById('cartItemCountHeader');
const summaryItemCount = document.getElementById('summaryItemCount');
const summarySubtotalEl = document.getElementById('summarySubtotal');
const summaryShippingEl = document.getElementById('summaryShipping');
const summaryTotalEl = document.getElementById('summaryTotal');
const clearCartBtn = document.querySelector('.clear-cart-btn');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const couponInput = document.getElementById('coupon-code');
const couponMessageEl = document.getElementById('couponMessage');


function formatCurrency(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function updateCartItemSubtotal(itemRow) {
    const priceEl = itemRow.querySelector('.cart-item-price');
    const quantityInput = itemRow.querySelector('.cart-item-quantity input');
    const subtotalEl = itemRow.querySelector('.cart-item-subtotal');

    const price = parseFloat(priceEl.dataset.price);
    const quantity = parseInt(quantityInput.value);
    const subtotal = price * quantity;
    subtotalEl.textContent = formatCurrency(subtotal);

    updateCartSummary();
}

function updateCartSummary() {
    let currentItemCount = 0;
    let currentSubtotal = 0;
    document.querySelectorAll('.cart-item-row').forEach(row => {
        currentItemCount += parseInt(row.querySelector('.cart-item-quantity input').value);
        const price = parseFloat(row.querySelector('.cart-item-price').dataset.price);
        const quantity = parseInt(row.querySelector('.cart-item-quantity input').value);
        currentSubtotal += price * quantity;
    });

    const shippingCost = 15000; // Contoh ongkir tetap

    if (cartCountHeader) cartCountHeader.textContent = currentItemCount;
    if (summaryItemCount) summaryItemCount.textContent = currentItemCount;
    if (summarySubtotalEl) summarySubtotalEl.textContent = formatCurrency(currentSubtotal);
    if (summaryShippingEl) summaryShippingEl.textContent = formatCurrency(shippingCost);
    
    let total = currentSubtotal + shippingCost;
    // Logika diskon dari kupon
    if (couponMessageEl && couponMessageEl.classList.contains('success')) {
        const discountAmount = parseFloat(couponMessageEl.dataset.discountAmount) || 0;
        total -= discountAmount;
    }
    if (summaryTotalEl) summaryTotalEl.textContent = formatCurrency(total < 0 ? 0 : total);

    // Update cart display
    if (currentItemCount === 0) {
        if(cartIsEmptyMessage) cartIsEmptyMessage.style.display = 'block';
        if(cartHasItems) cartHasItems.style.display = 'none';
    } else {
        if(cartIsEmptyMessage) cartIsEmptyMessage.style.display = 'none';
        if(cartHasItems) cartHasItems.style.display = 'grid'; // atau 'flex' tergantung layout
    }
}

// Initial cart calculation and setup
if (cartItemRows.length > 0) {
    cartItemRows.forEach(row => {
        const quantityInput = row.querySelector('.cart-item-quantity input');
        quantityInput.addEventListener('change', () => updateCartItemSubtotal(row));
        
        const removeBtn = row.querySelector('.remove-item-btn');
        removeBtn.addEventListener('click', () => {
            row.remove(); // Hapus dari DOM
            updateCartSummary();
            updateCartCount(-parseInt(quantityInput.value)); // Kurangi dari header
        });
    });
    updateCartSummary(); // Initial calculation
} else if (cartIsEmptyMessage) { // Jika tidak ada item sama sekali
    cartIsEmptyMessage.style.display = 'block';
    if(cartHasItems) cartHasItems.style.display = 'none';
    if (cartCountHeader) cartCountHeader.textContent = 0;
}


if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        if(confirm("Anda yakin ingin mengosongkan keranjang?")) {
            document.querySelectorAll('.cart-item-row').forEach(row => row.remove());
            updateCartSummary();
            updateCartCount(0, true); // Reset total count
        }
    });
}

if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
        const couponCode = couponInput.value.trim().toUpperCase();
        couponMessageEl.textContent = '';
        couponMessageEl.classList.remove('success', 'error');
        couponMessageEl.removeAttribute('data-discount-amount');

        if (couponCode === 'KOPIWEEKEND') {
            couponMessageEl.textContent = 'Kupon KOPIWEEKEND berhasil diterapkan! Diskon Rp 25.000.';
            couponMessageEl.classList.add('success');
            couponMessageEl.dataset.discountAmount = "25000";
        } else if (couponCode === 'AROMA10') {
            // Diskon 10% dari subtotal (placeholder)
            let subtotal = 0;
            document.querySelectorAll('.cart-item-row').forEach(row => {
                const price = parseFloat(row.querySelector('.cart-item-price').dataset.price);
                const quantity = parseInt(row.querySelector('.cart-item-quantity input').value);
                subtotal += price * quantity;
            });
            const discount = subtotal * 0.10;
            couponMessageEl.textContent = `Kupon AROMA10 berhasil! Diskon 10% (Rp ${discount.toLocaleString('id-ID')}).`;
            couponMessageEl.classList.add('success');
            couponMessageEl.dataset.discountAmount = discount.toString();
        } else if (couponCode === '') {
            couponMessageEl.textContent = 'Mohon masukkan kode kupon.';
            couponMessageEl.classList.add('error');
        }
        else {
            couponMessageEl.textContent = 'Kode kupon tidak valid.';
            couponMessageEl.classList.add('error');
        }
        updateCartSummary(); // Recalculate total with/without coupon
    });
}

// Helper untuk update cart count di header
const headerCartCountSpan = document.querySelector('header .cart-count');
function updateCartCount(change, absolute = false) {
    if(headerCartCountSpan) {
        let currentCount = parseInt(headerCartCountSpan.textContent.replace('(', '').replace(')', ''));
        if (absolute) {
            currentCount = change;
        } else {
            currentCount += change;
        }
        headerCartCountSpan.textContent = `(${currentCount < 0 ? 0 : currentCount})`;
    }
}
// Panggil updateCartCount saat halaman cart dimuat untuk inisialisasi dari jumlah item
if (cartHasItems && cartHasItems.style.display !== 'none') {
    let initialItemCount = 0;
    document.querySelectorAll('.cart-item-row').forEach(row => {
        initialItemCount += parseInt(row.querySelector('.cart-item-quantity input').value);
    });
    updateCartCount(initialItemCount, true);
}


// Panggil juga di akhir DOMContentLoaded untuk inisialisasi jika ada item yang sudah di-hardcode
// Panggil updateCartSummary jika ada item yang di-hardcode di HTML keranjang
if (document.querySelector('.cart-item-row')) {
    updateCartSummary();
} else if (cartIsEmptyMessage) { // Jika dari awal tidak ada item
    cartIsEmptyMessage.style.display = 'block';
    if (cartHasItems) cartHasItems.style.display = 'none';
    updateCartCount(0, true);
}

// Tambahkan di dalam DOMContentLoaded

// === CHECKOUT PAGE ===
const checkoutSteps = document.querySelectorAll('.checkout-page-main .checkout-step');
const nextStepBtns = document.querySelectorAll('.checkout-page-main .btn-next-step');
const editStepBtns = document.querySelectorAll('.checkout-page-main .btn-edit-step');

function showCheckoutStep(targetStepId) {
    checkoutSteps.forEach(step => {
        const content = step.querySelector('.step-content');
        if (step.id === targetStepId) {
            step.classList.add('active');
            if (content) content.style.display = 'block';
        } else {
            step.classList.remove('active');
            // Hanya collapse jika bukan step pertama (atau sudah pernah dibuka)
            if (content && step.id !== 'step-shipping' && !step.classList.contains('completed')) {
                 content.style.display = 'none';
            }
        }
    });
    // Scroll to the top of the step (optional)
    const activeStepElement = document.getElementById(targetStepId);
    if (activeStepElement) {
        activeStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

nextStepBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const currentStep = this.closest('.checkout-step');
        // Basic validation placeholder (implement proper validation)
        let isValid = true;
        if (currentStep.id === 'step-shipping') {
            const requiredInputs = currentStep.querySelectorAll('input[required], select[required], textarea[required]');
            requiredInputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c'; // Highlight error
                } else {
                    input.style.borderColor = ''; // Reset
                }
            });
        }
        if (!isValid) {
            alert('Mohon lengkapi semua kolom yang ditandai.');
            return;
        }

        currentStep.classList.add('completed'); // Tandai step selesai
        const nextStepId = this.dataset.next;
        showCheckoutStep(nextStepId);
        // Update review section (placeholder)
        if (nextStepId === 'step-review') updateOrderReview();
    });
});

editStepBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const targetStepId = this.dataset.target;
        showCheckoutStep(targetStepId);
    });
});

// Dropship checkbox
const dropshipCheckbox = document.getElementById('dropship-checkbox');
const dropshipFields = document.getElementById('dropship-fields');
if (dropshipCheckbox && dropshipFields) {
    dropshipCheckbox.addEventListener('change', function() {
        dropshipFields.style.display = this.checked ? 'block' : 'none';
    });
}

// Select dependent (Provinsi -> Kota -> Kecamatan) - Placeholder
const provinceSelect = document.getElementById('checkout-province');
const citySelect = document.getElementById('checkout-city');
const districtSelect = document.getElementById('checkout-district');

if (provinceSelect && citySelect && districtSelect) {
    provinceSelect.addEventListener('change', function() {
        // AJAX call to get cities based on province this.value
        // For now, enable and add dummy options
        citySelect.disabled = false;
        citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten</option><option value="jaksel">Jakarta Selatan</option>';
        districtSelect.disabled = true; districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
    });
    citySelect.addEventListener('change', function() {
        // AJAX call to get districts based on city this.value
        districtSelect.disabled = false;
        districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option><option value="kebayoran">Kebayoran Baru</option>';
    });
}

function updateOrderReview() { // Placeholder
    document.getElementById('review-shipping-address').textContent =
        `${document.getElementById('checkout-address').value}, ${document.getElementById('checkout-district').selectedOptions[0]?.textContent || ''}, ${document.getElementById('checkout-city').selectedOptions[0]?.textContent || ''}, ${document.getElementById('checkout-province').selectedOptions[0]?.textContent || ''}, ${document.getElementById('checkout-zip').value}. ${document.getElementById('checkout-fullname').value} (${document.getElementById('checkout-phone').value})`;

    const selectedShipping = document.querySelector('input[name="shipping_method"]:checked');
    if (selectedShipping) {
        const shippingDetails = selectedShipping.closest('.shipping-option').querySelector('.option-details');
        document.getElementById('review-shipping-method').textContent = `${shippingDetails.querySelector('.method-name').textContent} (${shippingDetails.querySelector('.method-price').textContent})`;
    }
    const selectedPayment = document.querySelector('input[name="payment_method"]:checked');
     if (selectedPayment) {
        document.getElementById('review-payment-method').textContent = selectedPayment.closest('.payment-option').querySelector('span').textContent;
    }
    // Update total dari sidebar/cart
    document.getElementById('review-subtotal-val').textContent = document.getElementById('sidebar-subtotal').textContent;
    document.getElementById('review-shipping-val').textContent = document.getElementById('sidebar-shipping').textContent;
    document.getElementById('review-total-val').textContent = document.getElementById('sidebar-total').textContent;
}

// Place Order Button (Form submission for checkout)
const placeOrderForm = document.getElementById('shipping-form'); // Assuming main form is this
if (placeOrderForm) {
    // Event listener on "Bayar Sekarang" button, which is type="submit" for this form
    placeOrderForm.addEventListener('submit', function(e){
        const termsCheckbox = document.getElementById('terms-checkbox');
        if(!termsCheckbox.checked){
            e.preventDefault();
            alert("Anda harus menyetujui Syarat & Ketentuan untuk melanjutkan.");
            termsCheckbox.focus();
            return;
        }
        // If all steps are validated and terms agreed, proceed
        console.log("Form checkout disubmit (simulasi)");
        alert("Pesanan Anda sedang diproses (simulasi)!");
        // Redirect to thank you page or order success page
        // window.location.href = "order-success.html";
    });
}

// Kupon di sidebar checkout (mirip keranjang)
const applyCouponBtnSidebar = document.getElementById('applyCouponBtnSidebar');
const couponInputSidebar = document.getElementById('coupon-code-sidebar');
const couponMessageSidebarEl = document.getElementById('couponMessageSidebar');
const sidebarCouponDiscountEl = document.getElementById('sidebar-coupon-discount');
const couponAppliedSidebarEl = document.querySelector('.coupon-applied-sidebar');

if (applyCouponBtnSidebar && couponInputSidebar) {
    applyCouponBtnSidebar.addEventListener('click', () => {
        // ... (logika kupon mirip di keranjang, update #sidebar-coupon-discount dan #sidebar-total) ...
        // Contoh:
        const couponCode = couponInputSidebar.value.trim().toUpperCase();
        couponMessageSidebarEl.textContent = '';
        couponMessageSidebarEl.classList.remove('success', 'error');
        sidebarCouponDiscountEl.textContent = '- Rp 0';
        if(couponAppliedSidebarEl) couponAppliedSidebarEl.style.display = 'none';

        let discountAmount = 0;
        if (couponCode === 'KOPIWEEKEND') {
            discountAmount = 25000;
            couponMessageSidebarEl.textContent = 'Kupon berhasil diterapkan!';
            couponMessageSidebarEl.classList.add('success');
        } else if (couponCode === '') {
             couponMessageSidebarEl.textContent = 'Masukkan kode kupon.';
            couponMessageSidebarEl.classList.add('error');
        } else {
            couponMessageSidebarEl.textContent = 'Kupon tidak valid.';
            couponMessageSidebarEl.classList.add('error');
        }

        if(discountAmount > 0 && couponAppliedSidebarEl){
            sidebarCouponDiscountEl.textContent = `- ${formatCurrency(discountAmount)}`;
            couponAppliedSidebarEl.style.display = 'flex';
        }
        updateCheckoutSidebarTotal(discountAmount);
    });
}

function updateCheckoutSidebarTotal(discount = 0){
    const subtotalText = document.getElementById('sidebar-subtotal').textContent;
    const shippingText = document.getElementById('sidebar-shipping').textContent;
    const subtotal = parseFloat(subtotalText.replace(/[^0-9,-]+/g,"").replace(",","."));
    const shipping = parseFloat(shippingText.replace(/[^0-9,-]+/g,"").replace(",","."));

    const total = (subtotal + shipping) - discount;
    document.getElementById('sidebar-total').textContent = formatCurrency(total < 0 ? 0 : total);

    // Juga update di bagian review jika sudah terbuka
    if(document.getElementById('step-review').classList.contains('active')){
        updateOrderReview();
    }
}


// Copyright year untuk footer simpel checkout
const currentYearCheckoutSpan = document.getElementById('currentYearCheckout');
if (currentYearCheckoutSpan) {
    currentYearCheckoutSpan.textContent = new Date().getFullYear();
}

// === ADMIN PANEL SPECIFIC SCRIPT ===
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode JS yang sudah ada) ...

    // Admin Mobile Sidebar Toggle
    const adminMenuToggle = document.getElementById('adminMenuToggle');
    const adminSidebar = document.querySelector('.admin-sidebar');
    // const adminSidebarOverlay = document.querySelector('.admin-sidebar-overlay'); // Jika pakai overlay

    if (adminMenuToggle && adminSidebar) {
        adminMenuToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('open');
            // if (adminSidebarOverlay) adminSidebarOverlay.style.display = adminSidebar.classList.contains('open') ? 'block' : 'none';
        });
        // if (adminSidebarOverlay) {
        //     adminSidebarOverlay.addEventListener('click', () => {
        //         adminSidebar.classList.remove('open');
        //         adminSidebarOverlay.style.display = 'none';
        //     });
        // }
    }

    // Admin Delete Confirmation (Contoh untuk Artikel)
    const deleteButtons = document.querySelectorAll('.admin-table .btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Jika tombolnya adalah link, cegah navigasi
            const itemName = this.dataset.name || 'item ini';
            const itemId = this.dataset.id;
            if (confirm(`Anda yakin ingin menghapus "${itemName}"? Aksi ini tidak dapat diurungkan.`)) {
                // Lakukan aksi hapus (misalnya, AJAX request ke backend)
                console.log(`Menghapus item ID: ${itemId}`);
                // Untuk demo, kita hapus row dari tabel
                this.closest('tr').remove();
                alert(`"${itemName}" berhasil dihapus (simulasi).`);
            }
        });
    });

    // Admin Form - Image Preview (Contoh untuk Artikel Featured Image)
    const featuredImageInput = document.getElementById('featured-image');
    const imagePreviewBox = document.getElementById('featured-image-preview');
    const imagePreviewText = imagePreviewBox ? imagePreviewBox.querySelector('.image-preview-text') : null;

    if (featuredImageInput && imagePreviewBox) {
        featuredImageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Hapus teks placeholder jika ada
                    if (imagePreviewText) imagePreviewText.style.display = 'none';
                    // Hapus pratinjau gambar lama jika ada
                    const oldImg = imagePreviewBox.querySelector('img');
                    if (oldImg) oldImg.remove();
                    
                    // Buat elemen img baru untuk pratinjau
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    imagePreviewBox.appendChild(img);
                }
                reader.readAsDataURL(file);
            } else {
                // Jika tidak ada file dipilih, kembalikan ke teks placeholder
                const oldImg = imagePreviewBox.querySelector('img');
                if (oldImg) oldImg.remove();
                if (imagePreviewText) imagePreviewText.style.display = 'block';
            }
        });
    }
    
    // Admin Form - Placeholder for WYSIWYG initialization (jika pakai library)
    // if (typeof tinymce !== 'undefined' && document.getElementById('article-content')) {
    //     tinymce.init({ selector: '#article-content', /* ...konfigurasi TinyMCE... */ });
    // }

    // Admin Form Submission (Placeholder)
    const articleAdminForm = document.getElementById('articleAdminForm'); // Contoh untuk form artikel
    if (articleAdminForm) {
        articleAdminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            // Cek tombol mana yang diklik (Publish atau Save Draft)
            const submitter = e.submitter; // Tombol yang men-trigger submit
            if (submitter && submitter.name) {
                formData.append('action', submitter.name); // 'publish' atau 'save_draft'
            }

            console.log('Form Data (Artikel):');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            alert('Data artikel disimpan (simulasi). Cek console untuk detail.');
            // Reset form atau redirect setelah sukses
            // this.reset();
            // window.location.href = 'admin-articles.html';
        });
    }

    // Logout Button Admin
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    if(adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function(e){
            e.preventDefault();
            if(confirm("Anda yakin ingin keluar dari panel admin?")){
                alert("Anda telah keluar (simulasi).");
                window.location.href = "../index.html"; // atau halaman utama
            }
        });
    }

});

// === ACCOUNT HISTORY PAGE ===
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode JS yang sudah ada: header, scroll, menu mobile, dll.) ...

    const orderCards = document.querySelectorAll('.account-section .order-card');
    const filterStatusSelect = document.getElementById('filter-order-status');
    const filterDateInput = document.getElementById('filter-order-date');
    const applyFiltersBtn = document.getElementById('applyOrderFiltersBtn');
    const resetFiltersBtn = document.getElementById('resetOrderFiltersBtn');
    const noOrdersMsg = document.getElementById('noOrdersMessage');
    const orderHistoryList = document.querySelector('.order-history-list'); // Container untuk order cards
    const orderHistoryPaginationContainer = document.getElementById('orderHistoryPagination');

    let currentOrderPage = 1;
    const ordersPerPage = 5; // Jumlah pesanan per halaman
    let filteredOrderCards = Array.from(orderCards); // Array awal dari semua order card

    function displayOrders() {
        if (!orderHistoryList) return;
        orderHistoryList.innerHTML = ''; // Kosongkan list

        const startIndex = (currentOrderPage - 1) * ordersPerPage;
        const endIndex = startIndex + ordersPerPage;
        const paginatedOrders = filteredOrderCards.slice(startIndex, endIndex);

        if (paginatedOrders.length === 0 && filteredOrderCards.length > 0) {
            currentOrderPage = 1;
            displayOrders();
            return;
        }
        
        paginatedOrders.forEach(card => {
            orderHistoryList.appendChild(card.cloneNode(true)); // Clone agar event listener scroll tetap jalan
        });
        
        // Re-initialize scroll animations
        const newCardsToAnimate = orderHistoryList.querySelectorAll('.animate-on-scroll');
        newCardsToAnimate.forEach(el => {
            el.classList.remove('is-visible', 'fade-in-up');
            if (typeof observer !== 'undefined') observer.observe(el);
        });

        updateOrderHistoryPaginationUI();
        
        if (noOrdersMsg) {
            noOrdersMsg.style.display = filteredOrderCards.length === 0 ? 'block' : 'none';
        }
    }

    function updateOrderHistoryPaginationUI() {
        if (!orderHistoryPaginationContainer || filteredOrderCards.length === 0) {
            if(orderHistoryPaginationContainer) orderHistoryPaginationContainer.style.display = 'none';
            return;
        }
        orderHistoryPaginationContainer.style.display = 'flex';
        orderHistoryPaginationContainer.innerHTML = '';

        const totalPages = Math.ceil(filteredOrderCards.length / ordersPerPage);
        if (totalPages <= 1) {
            orderHistoryPaginationContainer.style.display = 'none';
            return;
        }

        // Tombol Prev
        const prevButton = document.createElement('a');
        prevButton.href = '#';
        prevButton.classList.add('page-numbers', 'prev');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        if (currentOrderPage === 1) prevButton.classList.add('disabled');
        prevButton.addEventListener('click', (e) => { e.preventDefault(); if (currentOrderPage > 1) { currentOrderPage--; displayOrders(); } });
        orderHistoryPaginationContainer.appendChild(prevButton);

        // Nomor Halaman (Mirip pagination katalog, bisa di-refactor jadi fungsi umum)
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.classList.add('page-numbers');
            pageLink.textContent = i;
            if (i === currentOrderPage) pageLink.classList.add('current');
            pageLink.addEventListener('click', (e) => { e.preventDefault(); currentOrderPage = i; displayOrders(); });
            orderHistoryPaginationContainer.appendChild(pageLink);
        }
        
        // Tombol Next
        const nextButton = document.createElement('a');
        nextButton.href = '#';
        nextButton.classList.add('page-numbers', 'next');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        if (currentOrderPage === totalPages) nextButton.classList.add('disabled');
        nextButton.addEventListener('click', (e) => { e.preventDefault(); if (currentOrderPage < totalPages) { currentOrderPage++; displayOrders(); } });
        orderHistoryPaginationContainer.appendChild(nextButton);
    }


    function applyOrderFilters() {
        const statusFilter = filterStatusSelect ? filterStatusSelect.value : 'all';
        const dateFilter = filterDateInput ? filterDateInput.value : ''; // Format YYYY-MM

        filteredOrderCards = Array.from(orderCards).filter(card => {
            const cardStatus = card.dataset.status;
            const cardDate = card.dataset.date; // Format YYYY-MM-DD

            const statusMatch = (statusFilter === 'all' || cardStatus === statusFilter);
            const dateMatch = (dateFilter === '' || (cardDate && cardDate.startsWith(dateFilter)));

            return statusMatch && dateMatch;
        });
        currentOrderPage = 1; // Reset ke halaman pertama setelah filter
        displayOrders();
    }

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyOrderFilters);
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            if (filterStatusSelect) filterStatusSelect.value = 'all';
            if (filterDateInput) filterDateInput.value = '';
            applyOrderFilters();
        });
    }

    // Tombol "Lacak Pengiriman" (jika ada)
    // Menggunakan event delegation karena kartu order bisa di-generate ulang
    if (orderHistoryList) {
        orderHistoryList.addEventListener('click', function(e) {
            if (e.target.closest('.track-shipment-btn')) {
                const btn = e.target.closest('.track-shipment-btn');
                const resi = btn.dataset.resi;
                if (resi) {
                    alert(`Melacak pengiriman dengan resi: ${resi} (Simulasi).`);
                    // Contoh redirect ke situs pelacakan:
                    // window.open(`https://cekresi.com/?noresi=${resi}`, '_blank');
                } else {
                    alert("Nomor resi tidak ditemukan.");
                }
            }
        });
    }

    // Initial display for orders
    if (orderCards.length > 0) {
        displayOrders();
    } else {
        if (noOrdersMsg) noOrdersMsg.style.display = 'block';
        if (orderHistoryPaginationContainer) orderHistoryPaginationContainer.style.display = 'none';
    }

    // Logout link (jika belum ada di script utama)
    const logoutLink = document.querySelector('.account-sidebar .logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm("Anda yakin ingin keluar?")) {
                alert("Anda telah keluar (simulasi).");
                // window.location.href = 'login.html'; // atau halaman utama
            }
        });
    }
});

// === ADMIN PANEL SPECIFIC SCRIPT (Lanjutan untuk Produk) ===
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode JS Admin yang sudah ada: sidebar toggle, delete confirm, image preview utama) ...

    // Admin Product List - Select All Checkbox
    const selectAllProductsCheckbox = document.getElementById('selectAllProducts');
    const productItemCheckboxes = document.querySelectorAll('.select-product-item');
    const bulkActionsContainer = document.querySelector('.admin-table-bulk-actions');

    if (selectAllProductsCheckbox && productItemCheckboxes.length > 0) {
        selectAllProductsCheckbox.addEventListener('change', function() {
            productItemCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            toggleBulkActionsVisibility();
        });

        productItemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (!checkbox.checked) {
                    selectAllProductsCheckbox.checked = false;
                } else {
                    // Cek apakah semua item terpilih
                    const allChecked = Array.from(productItemCheckboxes).every(cb => cb.checked);
                    selectAllProductsCheckbox.checked = allChecked;
                }
                toggleBulkActionsVisibility();
            });
        });
    }
    
    function toggleBulkActionsVisibility() {
        if (bulkActionsContainer) {
            const anyChecked = Array.from(productItemCheckboxes).some(cb => cb.checked);
            bulkActionsContainer.style.display = anyChecked ? 'flex' : 'none';
        }
    }


    // Admin Product Form - Gallery Image Preview
    const galleryImageInput = document.getElementById('product-gallery-images');
    const galleryPreviewContainer = document.getElementById('gallery-images-preview-container');

    if (galleryImageInput && galleryPreviewContainer) {
        galleryImageInput.addEventListener('change', function() {
            galleryPreviewContainer.innerHTML = ''; // Bersihkan pratinjau lama
            const files = this.files;
            if (files.length > 5) {
                alert("Anda hanya dapat mengupload maksimal 5 gambar untuk galeri.");
                this.value = ""; // Reset input file
                return;
            }
            Array.from(files).forEach(file => {
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const previewItem = document.createElement('div');
                        previewItem.classList.add('gallery-preview-item');
                        
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        previewItem.appendChild(img);
                        
                        const removeBtn = document.createElement('button');
                        removeBtn.type = 'button';
                        removeBtn.classList.add('remove-gallery-image-btn');
                        removeBtn.innerHTML = '×';
                        removeBtn.title = 'Hapus gambar ini';
                        removeBtn.onclick = function() {
                            previewItem.remove();
                            // Logika untuk menghapus file dari input (lebih kompleks, biasanya ditangani saat submit)
                            // Untuk UI, kita hanya hapus previewnya
                        };
                        previewItem.appendChild(removeBtn);
                        galleryPreviewContainer.appendChild(previewItem);
                    }
                    reader.readAsDataURL(file);
                }
            });
        });
    }

    // Admin Product Form - Add/Remove Specifications
    const addSpecBtn = document.getElementById('addSpecificationBtn');
    const specContainer = document.getElementById('product-specifications-container');

    if (addSpecBtn && specContainer) {
        addSpecBtn.addEventListener('click', () => {
            const newItem = document.createElement('div');
            newItem.classList.add('specification-item', 'form-row');
            newItem.innerHTML = `
                <div class="form-group">
                    <input type="text" name="spec_name[]" placeholder="Nama Spesifikasi">
                </div>
                <div class="form-group">
                    <input type="text" name="spec_value[]" placeholder="Nilai Spesifikasi">
                </div>
                <button type="button" class="btn-remove-spec">×</button>
            `;
            specContainer.appendChild(newItem);
        });

        specContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove-spec')) {
                e.target.closest('.specification-item').remove();
            }
        });
    }

    // Admin Product Form - Add/Remove Variants (Placeholder UI)
    const addVariantBtn = document.getElementById('addVariantBtn');
    const variantsContainer = document.getElementById('product-variants-container');
    let variantCount = 0;

    if (addVariantBtn && variantsContainer) {
        addVariantBtn.addEventListener('click', () => {
            variantCount++;
            const newItem = document.createElement('div');
            newItem.classList.add('variant-item-row', 'admin-card'); // Bungkus dalam card untuk styling
            newItem.innerHTML = `
                <div class="admin-card-body">
                    <h4>Varian ${variantCount} <button type="button" class="btn-remove-variant" style="float:right; font-size:1.2rem;">×</button></h4>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="variant_name_${variantCount}">Nama Varian (cth: Warna)</label>
                            <input type="text" id="variant_name_${variantCount}" name="variants[${variantCount}][name]" placeholder="Warna">
                        </div>
                        <div class="form-group">
                            <label for="variant_value_${variantCount}">Nilai Varian (cth: Merah)</label>
                            <input type="text" id="variant_value_${variantCount}" name="variants[${variantCount}][value]" placeholder="Merah">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="variant_sku_${variantCount}">SKU Varian</label>
                            <input type="text" id="variant_sku_${variantCount}" name="variants[${variantCount}][sku]">
                        </div>
                        <div class="form-group">
                            <label for="variant_price_${variantCount}">Harga Varian (kosongkan jika sama)</label>
                            <input type="number" id="variant_price_${variantCount}" name="variants[${variantCount}][price]" step="1000" min="0">
                        </div>
                        <div class="form-group">
                            <label for="variant_stock_${variantCount}">Stok Varian</label>
                            <input type="number" id="variant_stock_${variantCount}" name="variants[${variantCount}][stock]" min="0">
                        </div>
                    </div>
                    <div class="form-group">
                         <label for="variant_image_${variantCount}">Gambar Varian (Opsional)</label>
                         <input type="file" id="variant_image_${variantCount}" name="variants[${variantCount}][image]" accept="image/*">
                    </div>
                </div>
            `;
            variantsContainer.appendChild(newItem);
        });
        variantsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-remove-variant')) {
                e.target.closest('.variant-item-row').remove();
            }
        });
    }


    // Admin Product Form Submission (Placeholder)
    const productAdminForm = document.getElementById('productAdminForm');
    if (productAdminForm) {
        productAdminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            console.log('Form Data (Produk):');
            for (let [key, value] of formData.entries()) {
                // Untuk file, value akan berupa object File
                if (value instanceof File) {
                    console.log(`${key}: ${value.name} (type: ${value.type}, size: ${value.size} bytes)`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            }
            alert('Data produk disimpan (simulasi). Cek console untuk detail.');
            // Reset form atau redirect
            // this.reset();
            // galleryPreviewContainer.innerHTML = ''; // Clear gallery previews
            // document.getElementById('main-image-preview').innerHTML = '<span class="image-preview-text">Pratinjau Gambar Utama</span>';
            // window.location.href = 'admin-products.html';
        });
    }
    
    // Placeholder untuk WYSIWYG (jika menggunakan library seperti Quill)
    // if (typeof Quill !== 'undefined' && document.getElementById('quill-editor-description')) {
    //     var quillDescription = new Quill('#quill-editor-description', {
    //         theme: 'snow',
    //         modules: { toolbar: [ /* Konfigurasi toolbar */ ] }
    //     });
    //     // Sinkronisasi ke textarea tersembunyi saat submit
    //     productAdminForm.addEventListener('submit', function() {
    //         document.getElementById('product-description').value = quillDescription.root.innerHTML;
    //     });
    // }

}); // Akhir DOMContentLoaded untuk admin produk

// === ADMIN PANEL SPECIFIC SCRIPT (Lanjutan untuk User, Transaksi, Dashboard) ===
document.addEventListener('DOMContentLoaded', function() {
    // ... (kode JS Admin yang sudah ada: sidebar, delete, image preview, form artikel, form produk) ...

    // Admin User List - Select All Checkbox
    const selectAllUsersCheckbox = document.getElementById('selectAllUsers');
    const userItemCheckboxes = document.querySelectorAll('.select-user-item');
    const userBulkActionsContainer = document.querySelector('.admin-table-bulk-actions'); // Pastikan ID unik jika ada beberapa bulk action

    if (selectAllUsersCheckbox && userItemCheckboxes.length > 0) {
        selectAllUsersCheckbox.addEventListener('change', function() {
            userItemCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            toggleUserBulkActionsVisibility();
        });
        userItemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                selectAllUsersCheckbox.checked = Array.from(userItemCheckboxes).every(cb => cb.checked);
                toggleUserBulkActionsVisibility();
            });
        });
    }
    function toggleUserBulkActionsVisibility() {
        if (userBulkActionsContainer) { // Check if element exists on current page
            const anyChecked = Array.from(userItemCheckboxes).some(cb => cb.checked);
            userBulkActionsContainer.style.display = anyChecked ? 'flex' : 'none';
        }
    }
    // Panggil saat load jika ada checkbox
    if (userBulkActionsContainer) toggleUserBulkActionsVisibility();


    // Admin User Form - Image Preview (jika belum ada fungsi generik)
    const userAvatarInput = document.getElementById('user-avatar');
    const userAvatarPreviewBox = document.getElementById('user-avatar-preview');
    if (userAvatarInput && userAvatarPreviewBox) {
        userAvatarInput.addEventListener('change', function() {
            const file = this.files[0];
            const previewText = userAvatarPreviewBox.querySelector('.image-preview-text');
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (previewText) previewText.style.display = 'none';
                    let img = userAvatarPreviewBox.querySelector('img');
                    if (!img) {
                        img = document.createElement('img');
                        userAvatarPreviewBox.appendChild(img);
                    }
                    img.src = e.target.result;
                }
                reader.readAsDataURL(file);
            } else {
                let img = userAvatarPreviewBox.querySelector('img');
                if (img) img.remove();
                if (previewText) previewText.style.display = 'block';
            }
        });
    }

    // Admin User Form - Password Confirmation (Basic Check)
    const userPasswordInput = document.getElementById('user-password');
    const userPasswordConfirmInput = document.getElementById('user-password-confirm');
    if (userPasswordConfirmInput && userPasswordInput) {
        userPasswordConfirmInput.addEventListener('input', () => {
            if (userPasswordConfirmInput.value !== userPasswordInput.value) {
                userPasswordConfirmInput.setCustomValidity("Konfirmasi kata sandi tidak cocok.");
            } else {
                userPasswordConfirmInput.setCustomValidity("");
            }
        });
    }
    
    // Admin Transaction Detail - Update Status & Tracking Number
    const updateOrderStatusSelect = document.getElementById('updateOrderStatus');
    const trackingNumberGroup = document.getElementById('trackingNumberInputGroup');
    if (updateOrderStatusSelect && trackingNumberGroup) {
        updateOrderStatusSelect.addEventListener('change', function() {
            trackingNumberGroup.style.display = (this.value === 'shipped') ? 'block' : 'none';
        });
        // Trigger change on load if 'shipped' is pre-selected
        if (updateOrderStatusSelect.value === 'shipped') {
            trackingNumberGroup.style.display = 'block';
        }
    }
    const saveOrderStatusBtn = document.getElementById('saveOrderStatusBtn');
    if (saveOrderStatusBtn) {
        saveOrderStatusBtn.addEventListener('click', function() {
            const newStatus = updateOrderStatusSelect ? updateOrderStatusSelect.value : '';
            const trackingNumber = document.getElementById('inputTrackingNumber') ? document.getElementById('inputTrackingNumber').value : '';
            alert(`Status pesanan diubah menjadi: ${newStatus} ${newStatus === 'shipped' && trackingNumber ? 'dengan resi: ' + trackingNumber : ''} (Simulasi)`);
            // Update UI status di halaman ini juga (contoh)
            const detailOrderStatusEl = document.getElementById('detailOrderStatus');
            const detailTrackingNumberEl = document.getElementById('detailTrackingNumber');
            if(detailOrderStatusEl) {
                detailOrderStatusEl.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
                detailOrderStatusEl.className = `status-badge status-${newStatus}`; // Update class badge
            }
            if(detailTrackingNumberEl && newStatus === 'shipped' && trackingNumber) {
                detailTrackingNumberEl.textContent = trackingNumber;
                detailTrackingNumberEl.closest('p').style.display = 'block'; // Tampilkan info resi
            } else if (detailTrackingNumberEl) {
                 detailTrackingNumberEl.closest('p').style.display = 'none'; // Sembunyikan jika bukan shipped
            }


        });
    }
    const detailTrackingNumberLink = document.querySelector('.tracking-number-link');
    if(detailTrackingNumberLink) {
        detailTrackingNumberLink.addEventListener('click', function(e){
            e.preventDefault();
            const resi = this.dataset.resi || this.textContent;
            alert(`Melacak pengiriman dengan resi: ${resi} (Simulasi)`);
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    // Original scroll and menu toggle logic
    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links'); // Original nav-links for mobile toggle

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Animate on scroll
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || '0s';
                entry.target.style.animationDelay = delay;
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    }, { threshold: 0.1 });

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // Testimonial Carousel
    const carousel = document.querySelector('.testimonial-carousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (carousel && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        const dots = dotsContainer.querySelectorAll('.dot');

        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-play (optional)
        // setInterval(nextSlide, 5000);

        updateCarousel(); // Initialize
    }


    // Footer: Current Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- NEW LOGIN/AUTH LOGIC ---
    const loginModal = document.getElementById('loginModal');
    const closeLoginModalBtn = document.getElementById('closeLoginModal');
    const loginForm = document.getElementById('loginForm');
    const navLinksContainer = document.getElementById('nav-links-container');
    const loginErrorMessage = document.getElementById('loginErrorMessage');

    // Dummy user credentials (in a real app, this comes from a backend)
    const users = {
        'admin@example.com': { password: '12345678', role: 'admin' },
        'user@example.com': { password: '12345678', role: 'user' }
    };

    function showLoginModal() {
        if (loginModal) loginModal.style.display = 'flex'; // Use flex for centering
    }

    function hideLoginModal() {
        if (loginModal) {
            loginModal.style.display = 'none';
            loginErrorMessage.style.display = 'none'; // Hide error on close
            loginForm.reset(); // Reset form fields
        }
    }
function updateNavbar() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    let navHTML = '';

    // Ganti link Beranda tergantung status login
    if (isLoggedIn && userRole === 'user') {
        navHTML += `<li><a href="cust-dashboard.html">Beranda</a></li>`;
    } else {
        navHTML += `<li><a href="index.html">Beranda</a></li>`;
    }

    navHTML += `<li><a href="catalog.html">Produk</a></li>`;
    navHTML += `<li><a href="blog.html">Blog</a></li>`;

    if (isLoggedIn) {
        if (userRole === 'user') {
            navHTML += `<li><a href="catalog.html">Toko</a></li>`;
            navHTML += `<li><a href="cart.html" aria-label="Keranjang Belanja"><i class="fas fa-shopping-cart"></i></a></li>`;
            navHTML += `<li><a href="account-history.html" aria-label="Profil Pengguna"><i class="fas fa-user-circle"></i></a></li>`;
        }

        navHTML += `<li><a href="#" id="logout-button">Logout</a></li>`;
    } else {
        navHTML += `<li><a href="#" id="login-nav-button">Login</a></li>`;
    }

    navLinksContainer.innerHTML = navHTML;

    // Re-attach event listeners for dynamically added buttons
    const loginNavButton = document.getElementById('login-nav-button');
    if (loginNavButton) {
        loginNavButton.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginModal();
        });
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }
}


    function handleLogin(event) {
        event.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const user = users[email];

        if (user && user.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userEmail', email); // Optional: store email

            hideLoginModal();
            updateNavbar(); // Update navbar immediately

            if (user.role === 'admin') {
                window.location.href = './admin/admin-dashboard.html';
            } else if (user.role === 'user') {
                // If user logs in from landing page, redirect to their dashboard or catalog
                window.location.href = 'cust-dashboard.html'; // Or catalog.html
            }
        } else {
            loginErrorMessage.textContent = 'Email atau password salah.';
            loginErrorMessage.style.display = 'block';
        }
    }

    function handleLogout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        updateNavbar();
        // Optional: Redirect to homepage or login page
        if (window.location.pathname.includes('/customer/') || window.location.pathname.includes('/admin/')) {
             window.location.href = '../index.html'; // Go back to main landing page
        }
    }

    // Event Listeners for Login/Logout
    if (closeLoginModalBtn) {
        closeLoginModalBtn.addEventListener('click', hideLoginModal);
    }
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Close modal if clicked outside of it
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            hideLoginModal();
        }
    });

    // Handle "Lihat Detail" product links
    const productDetailLinks = document.querySelectorAll('.product-detail-link');
    productDetailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userRole = localStorage.getItem('userRole');
            // const productId = link.dataset.productId; // If you need product ID later

            if (isLoggedIn && userRole === 'user') {
                // If user is logged in, redirect to catalog or specific product page
                window.location.href = 'catalog.html'; // Or a specific product detail page
            } else if (isLoggedIn && userRole === 'admin') {
                // Admin might have different behavior, e.g., edit product. For now, same as user or just log.
                console.log("Admin clicked product detail. Action TBD.");
                 window.location.href = 'catalog.html'; // Or admin product view
            }
            else {
                // If not logged in, show login modal
                showLoginModal();
            }
        });
    });


    // Initial setup
    updateNavbar();

    // Auto-redirect admin if they land on index.html while logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    if (isLoggedIn && userRole === 'admin' && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        // Don't auto-redirect if already on an admin page
        // This check is a bit simplistic, for more complex routing use a proper router
        if (!window.location.pathname.includes('/admin/')) {
             // window.location.href = './admin/admin-dashboard.html'; // Can be disruptive, user might want to see homepage
             console.log("Admin is logged in and on the homepage.");
        }
    }
});