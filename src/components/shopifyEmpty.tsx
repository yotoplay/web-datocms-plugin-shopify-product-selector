import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Button, useCtx } from 'datocms-react-ui';
import { FC } from 'react';

type Props = {};

const ShopifyEmpty: FC<Props> = () => {
    const ctx = useCtx<RenderFieldExtensionCtx>();
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
                border: '1px dashed #c0c0c040',
                height: '150px',
                flexDirection: 'column',
                gap: '2px',
            }}
        >
            <p>No selected product...</p>
            <Button type="button" onClick={handleOpenModal}>
                Select a product
            </Button>
        </div>
    );
};

export default ShopifyEmpty;
