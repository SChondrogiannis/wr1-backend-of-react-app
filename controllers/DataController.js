const axios = require('axios');
const controller = {};

controller.getPosts = async (req,res) => {
    try {
        if( postsTempSoThatNoSpammingTheEndpoint ) {
            return res.json(postsTempSoThatNoSpammingTheEndpoint);
        }
        console.log('POSTS: https://jsonplaceholder.typicode.com/posts');
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        postsTempSoThatNoSpammingTheEndpoint = response.data;
        res.json(response.data);
    } catch (error) {
        console.log('Error getPosts:', error);
        res.status(500).json({ error: 'Failed retrieving data' });
    }
}

controller.getPostById = async (req, res) => {
    const postId = req.params.id;
    // console.log( 'getPostById... '+postId );
    try {
        if( !storeDBData || (Date.now() - lastDBVarUpdated > 3600000) ){
            // We update and the POSTS - PHOTOS. In a real app, we would use only the storeDBData. The app would never ask for photos. When the frontend would ask for the post list, we would only send random 11 records from the storeDBData table, and obviously the react app would not had a global scope variable logic with the DB. I add this react configuration so that I use the react context system. 
            console.log('We make 2 requests to retrieve the MAPPING.')
            const dbData = await getDBData();
            if( dbData?.postsData && dbData?.photosData ){
                storeDBData = mapDBData( dbData.postsData , dbData.photosData );
                lastDBVarUpdated = Date.now();
            }
        }
        const post = storeDBData.find(post => post.id === parseInt(postId));
        if ( post ){
            res.json(post);
        } else {
            res.status(404).json({ error: `Post with ID ${postId} not found` });
        }
    } catch (error) {
        console.log(`Error getPostById: `, error);
        res.status(500).json({ error: 'There was an error. Try again later.' });
    }
};

function mapDBData(postsData, photosData){
    const photoMap = {};
    photosData.forEach((photo) => {
        const postId = photo.albumId;
        if (!photoMap[postId]) {
            photoMap[postId] = [];
        }
        photoMap[postId].push(photo);
    });
    return postsData.map((post) => ({
        ...post,
        images: photoMap[post.id] ? photoMap[post.id] : []
    }));
}

const getDBData = async () => {
    try {
        const [postsData, photosData] = await Promise.all([
            axios.get('https://jsonplaceholder.typicode.com/posts'),
            axios.get('https://jsonplaceholder.typicode.com/photos')
        ]);
        postsTempSoThatNoSpammingTheEndpoint = postsData.data;
        photosTempSoThatNoSpammingTheEndpoint = photosData.data;
        return { postsData: postsData.data , photosData: photosData.data };
    } catch (error) {
        console.log('Error getDBData:', error); 
        return {error:true};
    }
}

module.exports = controller;