import { FC, useState } from 'react';
import { RenderFieldExtensionCtx, RenderModalCtx } from 'datocms-plugin-sdk';
import { Button, useCtx, TextInput } from 'datocms-react-ui';
import { ProductType } from './shopifyDisplayProduct';

type Props = {
    modalCtx: RenderModalCtx;
};

const UpdateProduct: FC<Props> = ({ modalCtx }) => {
    const ctx = useCtx<RenderFieldExtensionCtx>();
    const [product, setProduct] = useState<ProductType>(
        modalCtx.parameters.product as ProductType
    );

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'start',
                padding: '5px auto',
                alignItems: 'center',
                height: '500px',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    padding: '5px auto',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '5px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '-webkit-fill-available',
                        justifyContent: 'start',
                        alignItems: 'start',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        gap: '20px',
                        marginBottom: '20px',
                    }}
                >
                    <p style={{ color: 'GrayText' }}>
                        Note: Enhance your product display with updates here.
                        Customize titles, descriptions, images for your
                        storefront without altering your Shopify inventory. For
                        instance, showcase a background-free image using this
                        plugin, exclusively on your frontend, while retaining
                        the original on your Shopify store..
                    </p>
                    <TextInput
                        name="title"
                        id="title"
                        size={47}
                        value={product.node.title ?? ''}
                        placeholder="Enter product name..."
                        onChange={(newValue) =>
                            setProduct({
                                node: { ...product.node, title: newValue },
                            })
                        }
                    />
                    <textarea
                        name="description"
                        id="description"
                        // size={1000}
                        style={{
                            height: '150px',
                            overflow: 'scroll',
                            width: 'inherit',
                            borderColor: 'var(--border-color)',
                            padding: '10px',
                            resize: 'none',
                            appearance: 'none',
                            backgroundImage: 'none',
                            display: 'block',
                            fontFamily: 'inherit',
                        }}
                        value={product.node.description ?? ''}
                        placeholder="Enter product description..."
                        onChange={(newValue) =>
                            setProduct({
                                node: {
                                    ...product.node,
                                    description: newValue.target.value,
                                },
                            })
                        }
                    />
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
                        <Button
                            onClick={async () => {
                                const item = await ctx.selectUpload({
                                    multiple: false,
                                });

                                if (item) {
                                    setProduct({
                                        node: {
                                            ...product.node,
                                            images: {
                                                edges: [
                                                    {
                                                        node: {
                                                            src:
                                                                item?.attributes
                                                                    ?.url ?? '',
                                                            url:
                                                                item?.attributes
                                                                    ?.url ?? '',
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    });
                                    ctx.notice(`Image drafted!`);
                                }
                            }}
                            type="button"
                            buttonType="primary"
                            buttonSize="s"
                            fullWidth
                        >
                            Update Asset
                        </Button>
                    </div>
                    <Button
                        onClick={async () => modalCtx.resolve(product)}
                        type="button"
                        buttonType="primary"
                        buttonSize="s"
                        fullWidth
                    >
                        Update Product
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
