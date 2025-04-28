import ProductCard from "./ProductCard";

const Products = () => {
  const isLoading = false;
  const error = null;
  const products = [
    {
      productId: 1,
      name: "abc",
      image: "https//placehold.co/600x400",
      description: "blah blah blah",
      price: "$200",
    },
    {
      productId: 2,
      name: "def",
      image: "https//placehold.co/600x400",
      description: "blah blah blah",
      price: "$150",
    },
    {
      productId: 3,
      name: "def",
      image: "https//placehold.co/600x400",
      description: "blah blah blah",
      price: "$150",
    },
    {
      productId: 4,
      name: "def",
      image: "https//placehold.co/600x400",
      description: "blah blah blah",
      price: "$150",
    },
  ];
  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:2-[90%] 2xl:mx-auto">
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div
          className="grid 2xl: grid-cols-4 lg:grid-cols-3 sm:grid-cols-2
          gap-2"
        >
          {products &&
            products.map((product, i) => <ProductCard key={i} {...product} />)}
        </div>
      )}
    </div>
  );
};

export default Products;
