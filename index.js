





function slug(schema, options={}) {
  if (options.attribute == undefined) {
    options.attribute = 'name';
  }

  if (options.new == undefined) {
    options.new = true;
  }

  schema.add({ slug: String });

  schema.methods.generateSlug = function(string) {
    return string.toLowerCase()                         // Convert to lowercase
      .trim()                                // Remove leading/trailing whitespace
      .replace(/[^\w\s-]/g, '')              // Remove non-word chars (except spaces and dashes)
      .replace(/[\s_-]+/g, '-')              // Replace spaces/underscores with a single dash
      .replace(/^-+|-+$/g, '');
  }

  schema.methods.setSlug = function() {
    this.slug = this.generateSlug(this[options.attribute])
  }

  schema.pre('save', function(next) {
    if (this.isNew && options.new == true) {
      this.setSlug();
    } else {
      this.setSlug();
    }
    next();
  })


}

module.exports = slug;


