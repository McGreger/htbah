import HtbahActorBase from './base-actor.mjs';

export default class HtbahCharacter extends HtbahActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'HTBAH.Actor.Character',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.skillSets = new fields.SchemaField({
      eureka: new fields.SchemaField({
        phy: new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        }),
        kno: new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        }),
        soc: new fields.SchemaField({
          value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        }),
      }),
    });

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 }),
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(
      Object.keys(CONFIG.HTBAH.abilities).reduce((obj, ability) => {
        obj[ability] = new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 10,
            min: 0,
          }),
        });
        return obj;
      }, {})
    );

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for (const key in this.abilities) {
      // Calculate the modifier using d20 rules.
      this.abilities[key].mod = Math.floor(
        (this.abilities[key].value - 10) / 2
      );
      // Handle ability label localization.
      this.abilities[key].label =
        game.i18n.localize(CONFIG.HTBAH.abilities[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k, v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data;
  }
}
