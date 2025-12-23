// Preload strategy for critical resources and route-based code splitting

// Preload critical routes when user hovers over navigation links
export const preloadCriticalRoutes = () => {
  const routePreloadMap = {
    '/btech': () => import('../components/SubCourse/BtechCourse'),
    '/projects': () => import('../components/ProjectsPage/ProjectsPage'),
    '/certificates': () => import('../components/CertificatePage/CertificatePage')
  };
  
  // Preload on mouse enter for navigation links
  const navLinks = document.querySelectorAll('a[href^="/"]');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const preloadFn = routePreloadMap[href];
    
    if (preloadFn) {
      link.addEventListener('mouseenter', () => {
        preloadFn().catch(() => {});
      }, { once: true });
    }
  });
};

// Intersection Observer for lazy loading components
export const createLazyLoader = (threshold = 0.1) => {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const componentName = element.dataset.component;
        
        // Dynamically import component when it enters viewport
        if (componentName && !element.dataset.loaded) {
          element.dataset.loaded = 'true';
          
          switch (componentName) {
            case 'contact':
              import('../components/Contact/Contact').catch(() => {});
              break;
            case 'courses':
              import('../components/Courses/Course').catch(() => {});
              break;
            case 'chatbot':
              import('../ChatBot/ChatBotWidget').catch(() => {});
              break;
            default:
              break;
          }
        }
      }
    });
  }, { threshold });
};

// Resource preloading for fonts and critical assets
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
    { href: '/images/mainlogo.png', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Prefetch non-critical resources during idle time
export const prefetchNonCriticalResources = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const nonCriticalResources = [
        '/lottie/meme.webp',
        '/images/hero-bg.webp'
      ];

      nonCriticalResources.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    });
  }
};

// Initialize all preload strategies
export const initializePreloadStrategy = () => {
  // Run immediately
  preloadCriticalResources();
  
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalRoutes();
      prefetchNonCriticalResources();
    });
  } else {
    preloadCriticalRoutes();
    prefetchNonCriticalResources();
  }
};
