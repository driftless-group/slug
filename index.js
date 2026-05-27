
function slug(schema, options={}) {

  if (options.attribute == undefined) {
    options.attribute = ['name'];
  }

  if (typeof options.attribute == 'string') {
    options.attribute = [options.attribute];
  }

  if (options.new == undefined) {
    options.new = true;
  }

  if (options.unique == undefined) {
    options.unique = false;
  }

  schema.add({ slug: String });

  schema.methods.generateSlug = function(string) {
    return string.toLowerCase() 
      .trim()  
      .replace(/[^\w\s-]/g, '') 
      .replace(/[\s_-]+/g, '-') 
      .replace(/^-+|-+$/g, '');
  }

  // need to verify uniqueness somehow.
  schema.methods.setSlug = function() {
    var self = this, attrs = [];

    this.slug = options.attribute.map((attr) => { 
      return self.generateSlug(self[attr]); 
    });

    if (options.unique) {
      this.slug.push(Math.random().toString(36).substring(2, 7));
    }

    this.slug = this.slug.join('-');
  }

  schema.pre('save', function(opts) {
    if (this.isNew && options.new == true) {
      this.setSlug();
    } else if (options.new == false) {
      this.setSlug();
    }

  })


}

module.exports = slug;


