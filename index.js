
function slug(schema, options={}) {
  if (options.attribute == undefined) {
    options.attribute = 'name';
  }

  if (options.new == undefined) {
    options.new = true;
  }

  schema.add({ slug: String });

  schema.methods.generateSlug = function(string) {
    return string.toLowerCase() 
      .trim()  
      .replace(/[^\w\s-]/g, '') 
      .replace(/[\s_-]+/g, '-') 
      .replace(/^-+|-+$/g, '');
  }

  schema.methods.setSlug = function() {
    this.slug = this.generateSlug(this[options.attribute])
  }

  schema.pre('save', function(options) {
    if (this.isNew && options.new == true) {
      this.setSlug();
    } else if (options.new == false) {
      this.setSlug();
    }

  })


}

module.exports = slug;


