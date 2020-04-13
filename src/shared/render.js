// Render a template with data
export const renderTemplate = (template, data) => {

  // Render the template using the data
  return template.replace(/{{(.*?)}}/g, (m, value) =>  value.replace(/(\ )/g, '').split('.').reduce((d, key) => d[key], data));
}