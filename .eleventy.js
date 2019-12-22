module.exports = (eleventyConfig) => {
    return {
	    dir: {
	        input: "src",
	        output: "gulp_src"
	    },

	    templateFormats: ["html", "njk", "md", "scss", "js", "jpg", "gif", "png"]
	};
};    
