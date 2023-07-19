import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Button } from 'datocms-react-ui';
import { FC } from 'react';

type Props = {
    ctx: RenderFieldExtensionCtx;
    product: any;
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
            <Button type="button" onClick={handleOpenModal}>
                Select a new product
            </Button>
            <p style={{ color: 'GrayText' }}>
                Note: In case you want to update the product with shopify
                backend, select the same product in the modal.
            </p>
            <div
                style={{
                    border: '0px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    gap: '10px',
                }}
            >
                <div
                    style={{
                        width: '150px',
                        height: '150px',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundImage: `url(${product.node.images.edges[0].node.src})`,
                    }}
                />
                <div>
                    <div>{product.node.title}</div>
                </div>
            </div>
        </div>
    );
};

export default ShopifyDisplayProduct;
