import React from "react";


const Help = () => {
    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Help:</h1>
            
            <div className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">What are the order placement guidelines?</h2>
                    <p>
                        In order to ensure complete customer satisfaction, browse through the details to know more about the seller’s performance:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li><strong>Seller Ratings:</strong> The customers rate the sellers based on their satisfaction level.</li>
                        <li><strong>Ship on Time:</strong> Seller’s commitment to delivery is determined by the Ship on Time rate.</li>
                        <li><strong>Chat Response Rate:</strong> This rate shows the responsive attitude of sellers to the customers.</li>
                    </ul>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">Why am I unable to find my location during order placement?</h2>
                    <p>
                        Daraz delivery service is available in major cities across Nepal. Please refer to the link to find out the available serviceable areas. If your location is not available, then we currently do not have a home delivery service in that area. You can, however, select a city near you and pick up your package from our nearest hub.
                    </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">I am unable to add the selected item to cart, why is this happening?</h2>
                    <p>
                        If you are having trouble placing products in your cart, the reasons could be:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>The product is out of stock.</li>
                        <li>The selected color or size is not available. You can add products that are out of stock to your wishlist and get notified when they're available again.</li>
                    </ul>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">How would I know if my order has been confirmed?</h2>
                    <p>
                        Upon the order confirmation, please expect notification via any of the below channels:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>E-mail</li>
                        <li>Push Notification on the Daraz app</li>
                    </ul>
                    <p>
                        If your Order requires manual confirmation, our team will contact you via call within 24 hours after order placement to do the needful.
                    </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">How to check the available flash sales?</h2>
                    <p>
                        To keep yourself updated on the exciting discounts and Flash Sales, check out the Flash Sale on the Home Page. Click 'Shop More' to know more about the daily updates on sales.
                    </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">Why am I seeing different prices for the same product?</h2>
                    <p>
                        We have a huge seller base and each seller sources their product differently, due to which prices fluctuate for the same product but you can choose depending on your preference as the product quality remains the same.
                    </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">Can I call Daraz to place an order?</h2>
                    <p>
                        Unfortunately, our customer service representatives are unable to place an order. However, placing an order on Daraz is really simple, and we would love for you to try it out for yourself! Simply create an account, select what you are looking for, and pay!
                    </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">Do I need an account to shop on Daraz?</h2>
                    <p>
                        Having a Daraz account helps us to make your shopping experience fast, secure, and convenient. You can create your own Daraz account or simply use your Facebook login. Click here to register now!
                    </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md shadow hover:bg-gray-200 transition-colors duration-200">
                    <h2 className="font-semibold">Why am I unable to place an order?</h2>
                    <p>
                        If you are facing the above error while placing the order then please check the below points:
                    </p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>If your account information is incomplete, update the entire account information, e.g., (Email, contact number & address).</li>
                        <li>If you are using a Voucher, remove it and try again without the Voucher. You can only order 5 quantities of each product in an order.</li>
                        <li>If you're ordering more than 5 quantities of a product, reduce the quantity to 5.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Help;
