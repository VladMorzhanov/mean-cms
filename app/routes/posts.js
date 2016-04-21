/**
 * POSTS ROUTES
 */

var mongoose = require('mongoose');
var Page = require('../models/page.js');
var config = require('../../config');
var fs = require('fs');
var formidable = require('formidable');

module.exports = function (app, express) {

    /**
     * get an instance of the express router
     */
    var postRouter = express.Router();

    /**
     * For posts routes with reference (/api/posts)
     */
    postRouter.route('/')
        /**
         * Get all posts
         */
        .get(function (request, response) {

            return Page.find(function (err, pages) {
                if (!err) {
                    return response.send(pages);
                } else {
                    return response.send(500, err);
                }
            });
        })
        /**
         * Create new post in DB
         * id - ID of page
         */
        .post(function (request, response) {

            var page = new Page({
                title: request.body.title,
                url: request.body.url,
                content: request.body.content,
                menuIndex: request.body.menuIndex,
                date: new Date(Date.now())
            });

            page.save(function (err) {
                if (!err) {
                    return response.send(200, page);
                }
                else {
                    return response.send(500, err);
                }
            });
        });

    /**
     * For posts routes with reference (/api/posts/:id)
     */
    postRouter.route('/:id')

        /**
         * Get single post
         */
        .get(function (request, response) {

            return Page.find(function (err, pages) {
                if (!err) {
                    return response.send(pages);
                } else {
                    return response.send(500, err);
                }
            });
        })

        /**
         * update a post
         * id - ID of post
         */
        .put(function (request, response) {
            var id = request.body._id;

            Page.update(
                {
                    _id: id
                },
                {
                    $set: {
                        title: request.body.title,
                        url: request.body.url,
                        content: request.body.content,
                        menuIndex: request.body.menuIndex,
                        date: new Date(Date.now())
                    }
                }).exec();
            response.send("Page updated");
        })

        /**
         * delete a single post
         * id - ID of post
         */
        .delete(function (request, response) {

            var id = request.params.id;

            Page.remove({
                    _id: id
                },
                function (err) {
                    return console.log(err);
                });
            return response.send('Page id- ' + id + 'has been deleted');
        });

    /**
     * Return postRouter to app
     */
    return postRouter;

};