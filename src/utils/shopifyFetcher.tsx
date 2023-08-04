const productFragment = `
  id
  title
  handle
  description
  onlineStoreUrl
  availableForSale
  productType
  priceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
  images(first: 1) {
    edges {
      node {
        url
        src: transformedSrc(crop: CENTER, maxWidth: 200, maxHeight: 200)
      }
    }
  }
`;

export const fetchProducts = async (store: any, query?: string) => {
    // fetch products by shopify name by grapql query
    const requestBody = {
        query: `
          query getProducts($query: String) {
              products(first: 10, query: $query) {
                edges {
                  node {
                    ${productFragment}
                  }
                }
            }
          }
        `,
        variables: { query: query || null },
    };
    try {
        const res = await fetch(
            `https://${store.storeUrl}.myshopify.com/api/graphql`, //`https://graphql.myshopify.com/api/graphql`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token':
                        store.storefrontApiAccessToken, //"20606acdc9c4d8ac6526fd7f5a231e8a" // "078bc5caa0ddebfa89cccb4a1baa1f5c",
                },
                body: JSON.stringify(requestBody),
            }
        );
        const json = await res.json();
        return json.data.products.edges;
    } catch (error) {
        return error;
    }
};
