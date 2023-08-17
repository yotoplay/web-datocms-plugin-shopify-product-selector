import { buildClient } from '@datocms/cma-client-node';
export const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
};

function handleProgress(info: any) {
    // info.type can be one of the following:
    //
    // * DOWNLOADING_FILE: client is downloading the asset from the specified URL
    // * REQUESTING_UPLOAD_URL: client is requesting permission to upload the asset to the DatoCMS CDN
    // * UPLOADING_FILE: client is uploading the asset
    // * CREATING_UPLOAD_OBJECT: client is finalizing the creation of the upload resource
    console.log('Phase:', info.type);
    // Payload information depends on the type of notification
    console.log('Details:', info.payload);
}

export async function run() {
    const client = buildClient({ apiToken: '<YOUR_API_TOKEN>' });
    // Create upload resource from a remote URL
    const upload1 = await client.uploads.createFromUrl({
        // remote URL to upload
        url: 'https://example.com/image.png',
        // if you want, you can specify a different base name for the uploaded file
        filename: 'different-image-name.png',
        // skip the upload and return an existing resource if it's already present in the Media Area:
        skipCreationIfAlreadyExists: true,
        // be notified about the progress of the operation.
        onProgress: handleProgress,
        // specify some additional metadata to the upload resource
        author: 'New author!',
        copyright: 'New copyright',
    });
    // Create upload resource from a local file
    const upload2 = await client.uploads.createFromLocalFile({
        // local path of the file to upload
        localPath: './image.png',
        // if you want, you can specify a different base name for the uploaded file
        filename: 'different-image-name.png',
        // skip the upload and return an existing resource if it's already present in the Media Area:
        skipCreationIfAlreadyExists: true,
        // be notified about the progress of the operation.
        onProgress: handleProgress,
        // specify some additional metadata to the upload resource
        author: 'New author!',
        copyright: 'New copyright',
        default_field_metadata: {
            en: {
                alt: 'New default alt',
                title: 'New default title',
                focal_point: {
                    x: 0.3,
                    y: 0.6,
                },
                custom_data: {
                    watermark: true,
                },
            },
        },
    });
    console.log(upload2);
}
run();
