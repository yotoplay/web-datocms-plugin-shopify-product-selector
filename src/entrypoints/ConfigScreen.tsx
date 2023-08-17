import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { Formik, Field, Form, FormikHelpers, FieldArray } from 'formik';
import { Button } from 'datocms-react-ui';
import { isEmpty } from '../utils/helpers';
// , TextInput, Spinner

type Props = {
    ctx: RenderConfigScreenCtx;
};

type StoreType = {
    name: string;
    storeUrl: string;
    storefrontApiAccessToken: string;
};
interface Values {
    stores: StoreType[];
}

export default function ConfigScreen({ ctx }: Props) {
    console.log('🚀 ~ file: ConfigScreen.tsx:20 ~ ConfigScreen ~ ctx:', ctx);
    return (
        <Canvas ctx={ctx}>
            <p>Welcome to Shopify Product Selector.</p>
            <p>
                Needed to create a shopify product that supported pulling in
                products from different stores.
            </p>
            <Formik
                initialValues={{
                    stores: isEmpty(ctx.plugin.attributes.parameters)
                        ? [
                              {
                                  name: 'Grapch Store',
                                  storeUrl: 'graphql',
                                  storefrontApiAccessToken:
                                      '078bc5caa0ddebfa89cccb4a1baa1f5c',
                              },
                          ]
                        : (ctx.plugin.attributes.parameters
                              .stores as StoreType[]),
                }}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    ctx.updatePluginParameters(values as any);
                    ctx.notice('Settings updated successfully!');
                    setSubmitting(false);
                }}
            >
                {({ values }: { values: Values }) => (
                    <Form>
                        <FieldArray
                            name="stores"
                            render={(arrayHelpers: any) => (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'start',
                                        height: '150px',
                                        flexDirection: 'column',
                                        gap: '10px',
                                    }}
                                >
                                    {values.stores &&
                                    values.stores.length > 0 ? (
                                        values.stores.map((stores, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    width: '100%',
                                                    flexWrap: 'nowrap',
                                                }}
                                            >
                                                <Field
                                                    style={{
                                                        width: '25%',
                                                        border: '1px dashed #c0c0c040',
                                                        padding:
                                                            'var(--spacing-s)',
                                                        fontSize:
                                                            'var(--font-size-s)',
                                                    }}
                                                    name={`stores.${index}.name`}
                                                />
                                                <Field
                                                    style={{
                                                        width: '25%',
                                                        border: '1px dashed #c0c0c040',
                                                        padding:
                                                            'var(--spacing-s)',
                                                        fontSize:
                                                            'var(--font-size-s)',
                                                    }}
                                                    name={`stores.${index}.storeUrl`}
                                                />
                                                <Field
                                                    style={{
                                                        width: '30%',
                                                        border: '1px dashed #c0c0c040',
                                                        padding:
                                                            'var(--spacing-s)',
                                                        fontSize:
                                                            'var(--font-size-s)',
                                                    }}
                                                    name={`stores.${index}.storefrontApiAccessToken`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        arrayHelpers.remove(
                                                            index
                                                        )
                                                    }
                                                    style={{
                                                        width: '5%',
                                                        border: '1px dashed #c0c0c040',
                                                        padding:
                                                            'var(--spacing-s)',
                                                        fontSize:
                                                            'var(--font-size-s)',
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        arrayHelpers.insert(
                                                            index,
                                                            ''
                                                        )
                                                    } //
                                                    style={{
                                                        width: '5%',
                                                        border: '1px dashed #c0c0c040',
                                                        padding:
                                                            'var(--spacing-s)',
                                                        fontSize:
                                                            'var(--font-size-s)',
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push('')
                                            }
                                            buttonType="primary"
                                            buttonSize="s"
                                        >
                                            {/* show this when user has removed all stores from the list */}
                                            Add a store
                                        </Button>
                                    )}
                                    <div>
                                        <Button
                                            type="submit"
                                            buttonType="primary"
                                            buttonSize="s"

                                            // leftIcon={{/* <FontAwesomeIcon icon={faSearch} /> */}}
                                            // disabled={status === 'loading'}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )}
            </Formik>
        </Canvas>
    );
}
