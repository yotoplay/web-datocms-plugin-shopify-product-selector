import { FC, useState } from 'react';
import { RenderFieldExtensionCtx, RenderModalCtx } from 'datocms-plugin-sdk';
import {
    Button,
    useCtx,
    Dropdown,
    DropdownMenu,
    DropdownOption,
    CaretUpIcon,
    CaretDownIcon,
    TextInput,
} from 'datocms-react-ui';
import { fetchProducts } from '../utils/shopifyFetcher';

type Props = {
    modalCtx: RenderModalCtx;
};

const ShopifySelector: FC<Props> = ({ modalCtx }) => {
    const ctx = useCtx<RenderFieldExtensionCtx>();
    const [activeStore, setActiveStore] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [shopifyProducts, setShopifyProducts] = useState<any[] | null>(null);
    const stores = ctx.plugin.attributes.parameters?.stores as any[];
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
                    justifyContent: 'start',
                    padding: '5px auto',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: '5px',
                }}
            >
                <Dropdown
                    renderTrigger={({ open, onClick }) => (
                        <Button
                            onClick={onClick}
                            rightIcon={
                                open ? <CaretUpIcon /> : <CaretDownIcon />
                            }
                        >
                            Select a store...
                        </Button>
                    )}
                >
                    <DropdownMenu>
                        {stores?.map((store: any) => {
                            return (
                                <DropdownOption
                                    onClick={() => setActiveStore(store)}
                                    key={store.name}
                                >
                                    <p style={{ minHeight: '20px' }}>
                                        {store.name ?? 'Store'}
                                    </p>
                                </DropdownOption>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
                {activeStore && (
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
                                width: '100%',
                                justifyContent: 'start',
                                alignItems: 'start',
                                flexDirection: 'column',
                            }}
                        >
                            <TextInput
                                name="name"
                                id="name"
                                size={47}
                                value={searchTerm ?? ''}
                                placeholder="Enter product name..."
                                onChange={(newValue) => setSearchTerm(newValue)}
                            />
                        </div>
                        <Button
                            onClick={async () => {
                                fetchProducts(activeStore, searchTerm)
                                    .then((products) => {
                                        setShopifyProducts(products);
                                    })
                                    .catch((err) => {
                                        console.log(
                                            '🚀 ~ file: shopifySelector.tsx:47 ~ err',
                                            err
                                        );
                                    });
                            }}
                            type="button"
                            buttonType="primary"
                            buttonSize="s"
                        >
                            Search
                        </Button>
                    </div>
                )}
            </div>
            <div>
                {shopifyProducts && shopifyProducts.length > 0 ? (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '2px',
                            width: '100%',
                            height: '100%',
                            maxHeight: '500px',
                            overflowY: 'scroll',
                        }}
                    >
                        {shopifyProducts.map((product) => {
                            return (
                                <button
                                    key={product.node.id}
                                    onClick={() => {
                                        modalCtx.resolve(product);
                                    }}
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
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <p>No products found....</p>
                )}
            </div>
        </div>
    );
};

export default ShopifySelector;
