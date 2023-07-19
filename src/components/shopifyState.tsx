import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { FC } from 'react';
import get from 'lodash';
import { isEmpty } from '../utils/helpers';
import ShopifyEmpty from './shopifyEmpty';
import ShopifyDisplayProduct from './shopifyDisplayProduct';

type Props = {
    ctx: RenderFieldExtensionCtx;
};

const ShopifyState: FC<Props> = ({ ctx }) => {
    const strinfiedValue = get.get(ctx.formValues, ctx.fieldPath) as
        | string
        | null;
    const initialValue = strinfiedValue ? JSON.parse(strinfiedValue) : {};

    return (
        <Canvas ctx={ctx}>
            {isEmpty(initialValue) ? (
                <ShopifyEmpty />
            ) : (
                <ShopifyDisplayProduct ctx={ctx} product={initialValue} />
            )}
        </Canvas>
    );
};

export default ShopifyState;
