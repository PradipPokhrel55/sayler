const config = {
    publicKey: "YOUR_PUBLIC_KEY_HERE",
    productIdentity: "1234567890",
    productName: "E-commerce Item",
    productUrl: "http://localhost:3000/product-url",
    eventHandler: {
        onSuccess(payload) {
            console.log("Payment Successful", payload);
            
        },
        onError(error) {
            console.log("Payment Failed", error);
        },
        onClose() {
            console.log("Payment widget closed");
        }
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;
