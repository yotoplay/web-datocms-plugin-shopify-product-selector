import {
    RenderFieldExtensionCtx,
    RenderModalCtx,
    connect,
} from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { render } from './utils/render';
import ConfigScreen from './entrypoints/ConfigScreen';
import 'datocms-react-ui/styles.css';
import ShopifyState from './components/shopifyState';
import ShopifySelector from './components/shopifySelector';
import UpdateProduct from './components/updateProduct';

connect({
    renderConfigScreen(ctx) {
        return render(<ConfigScreen ctx={ctx} />);
    },
    manualFieldExtensions(ctx) {
        return [
            {
                id: 'shopifySelectorProduct',
                name: 'Product Selector Shopify',
                type: 'editor',
                fieldTypes: ['json'],
            },
        ];
    },
    renderManualFieldExtensionConfigScreen(fieldExtensionId, ctx) {
        if (
            fieldExtensionId === 'shopifySelectorProduct' ||
            fieldExtensionId === 'shopify_selector_product'
        ) {
            return render(
                <div style={{ color: 'green' }}>Shopify Product Selector</div>
            );
        }
    },
    renderFieldExtension(fieldExtensionId, ctx: RenderFieldExtensionCtx) {
        if (
            fieldExtensionId === 'shopifySelectorProduct' ||
            fieldExtensionId === 'shopify_selector_product'
        ) {
            return render(<ShopifyState ctx={ctx} />);
        }
    },
    renderModal(modalId: string, ctx: RenderModalCtx) {
        switch (modalId) {
            case 'searchProductModal':
                return render(
                    <Canvas ctx={ctx}>
                        <ShopifySelector modalCtx={ctx} />
                    </Canvas>
                );
            case 'upadateProductModal':
                return render(
                    <Canvas ctx={ctx}>
                        <UpdateProduct modalCtx={ctx} />
                    </Canvas>
                );
        }
    },
});
