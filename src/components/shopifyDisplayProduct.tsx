import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Button } from 'datocms-react-ui';
import { FC } from 'react';

type Props = {
    ctx: RenderFieldExtensionCtx;
    product: any;
};

export type ProductType = {
    node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        onlineStoreUrl: string;
        availableForSale: boolean;
        productType: string;
        priceRange: {
            maxVariantPrice: {
                amount: string;
                currencyCode: string;
            };
            minVariantPrice: {
                amount: string;
                currencyCode: string;
            };
        };
        images: {
            edges: [
                {
                    node: {
                        src: string;
                    };
                }
            ];
        };
    };
};

const ShopifyDisplayProduct: FC<Props> = ({ product, ctx }) => {
    const handleOpenModal = async () => {
        const result = await ctx.openModal({
            id: 'searchProductModal',
            title: 'Search for a product',
            width: 'l',
            parameters: { name: 'Mark' },
        });
        ctx.setFieldValue(ctx.fieldPath, JSON.stringify(result));
    };
    const handleUpdateProduct = async () => {
        const result = await ctx.openModal({
            id: 'upadateProductModal',
            title: 'Update product',
            width: 'l',
            parameters: { product },
        });
        ctx.setFieldValue(ctx.fieldPath, JSON.stringify(result));
    };
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <div>
                <Button type="button" onClick={handleOpenModal}>
                    Select a new product
                </Button>
                <Button type="button" onClick={handleUpdateProduct}>
                    Update product
                </Button>
            </div>
            <p style={{ color: 'GrayText' }}>
                Note: In case you want to update the product with shopify
                backend, select the same product in the modal.
            </p>
            <div
                style={{
                    border: '0px solid black',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'start',
                    alignItems: 'start',
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    gap: '20px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        justifyContent: 'start',
                        alignItems: 'start',
                        minWidth: '250px',
                    }}
                >
                    <span style={{ fontSize: '8px' }}>Product Image</span>
                    <div
                        style={{
                            margin: 'auto',
                            minWidth: '250px',
                            height: '250px',
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `url(${product.node.images.edges[0].node.src})`,
                        }}
                    />
                </div>
                <div
                    style={{
                        minWidth: '250px',
                    }}
                >
                    <span style={{ fontSize: '8px' }}>Product Title</span>
                    <h1 style={{ marginTop: '0px', lineHeight: '20px' }}>
                        {product.node.title}
                    </h1>
                    <span style={{ fontSize: '8px' }}>Product Description</span>
                    <p style={{ marginTop: '0px' }}>
                        {product.node.description}
                    </p>
                    <span style={{ fontSize: '8px' }}>Product Url</span>
                    <p style={{ marginTop: '0px' }}>
                        {product.node.onlineStoreUrl}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShopifyDisplayProduct;
