/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/htbah/templates/actor/parts/actor-skills.hbs',
    'systems/htbah/templates/actor/parts/actor-items.hbs',
    'systems/htbah/templates/actor/parts/actor-spells.hbs',
    'systems/htbah/templates/actor/parts/actor-effects.hbs',
    // Item partials
    'systems/htbah/templates/item/parts/item-effects.hbs',
  ]);
};
