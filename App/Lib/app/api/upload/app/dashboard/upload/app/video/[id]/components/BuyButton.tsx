'use client';

export default function BuyButton({ videoId, price }: { videoId: string; price: number }) {
  const handleBuy = () => {
    window.open(`https://bill.ccbill.com/jpost/billingPage.html?clientAccnum=950111&videoId=${videoId}&price=${price}`, '_blank');
  };

  return <button onClick={handleBuy} className="bg-red-600 text-white py-3 px-6 rounded">Buy for ${price}</button>;
}
