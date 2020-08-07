// @ts-check
const Posts = require("./S3/posts");
const autoCatch = require("./autoCatch");

module.exports = autoCatch({
    getPosts,
    getPost,
});

/**
 *
 * @param {Object} date
 * @returns {string}
 */
function displayDate(date) {
    return date.toLocaleDateString();
}

function displayItem(key) {
    // return key.replace(/posts\/|.html/g, "");
    return key;
}

async function getPosts(req, res, next) {
    const data = await Posts.list();
    let posts;
    if (!data) {
        posts = [];
    } else {
        posts = data.Contents.filter((el) => el !== "").map((obj) => {
            return {
                Key: displayItem(obj.Key),
                LastModified: displayDate(new Date(obj.LastModified)),
            };
        });
    }
    res.render("index", { title: "Posts", posts });
}

async function getPost(req, res, next) {
    const { id } = req.params;
    const post = await Posts.get(id);
    if (!post) return next();
    res.render("post", { title: "Post", post });
}
