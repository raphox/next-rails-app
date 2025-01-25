module.exports = {
  params: ({ args, h }) => {
    const process_args = process.argv.slice(3);
    const [_generator, _action, ...others] = process_args;

    const attributes = others.reduce((result, item) => {
      const [key, type] = item.split(":");
      result[key] = type;

      return result;
    }, {});

    class_name = h.inflection.classify(args.name);
    human_name = h.inflection.humanize(class_name);
    plural_table_name = h.inflection.tableize(class_name);
    singular_table_name = h.inflection.singularize(plural_table_name);

    return {
      npm_package_version: process.env.npm_package_version,
      human_name,
      class_name,
      plural_table_name,
      singular_table_name,
      resource_attrs: attributes,
    };
  },
};
