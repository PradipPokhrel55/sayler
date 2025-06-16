import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import banner1 from '../assets/banner-1.jpg';
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.jpg';
import blog1 from '../assets/blog-1.jpg';
import blog2 from '../assets/blog-2.jpg';
import blog3 from '../assets/blog-3.jpg';
import blog4 from '../assets/blog-4.jpg';
import ctaBanner from '../assets/cta-banner.jpg';
import electronicsBanner1 from '../assets/electronics-banner-1.jpg';
import electronicsBanner2 from '../assets/electronics-banner-2.jpg';
import mensBanner from '../assets/mens-banner.jpg';
import womensBanner from '../assets/womens-banner.jpg';

const CarouselComponent = () => {
    return (
        <div className="w-full max-w-7xl mx-auto my-8 rounded-lg overflow-hidden shadow-lg">
            <Carousel 
                showThumbs={false} 
                autoPlay={true} 
                infiniteLoop={true}
                interval={3000}
                showStatus={false}
                className="rounded-lg"
            >
                <div>
                    <img src={banner1} alt="Slide 1" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={banner2} alt="Slide 2" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={banner3} alt="Slide 3" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={blog1} alt="Slide 4" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={blog2} alt="Slide 5" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={blog3} alt="Slide 6" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={blog4} alt="Slide 7" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={ctaBanner} alt="Slide 8" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={electronicsBanner1} alt="Slide 9" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={electronicsBanner2} alt="Slide 10" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={mensBanner} alt="Slide 11" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
                <div>
                    <img src={womensBanner} alt="Slide 12" className="h-[50vh] md:h-[70vh] lg:h-[80vh] w-full object-contain" />
                </div>
            </Carousel>
        </div>
    );
}

export default CarouselComponent;
