module.exports = (eleventyConfig) => {
    return {
	    dir: {
	        input: "src",
	        output: "gulpsrc"
	    },

	    templateFormats: ["html", "njk", "md", "scss", "js", "jpg", "gif", "png"]
	};
};