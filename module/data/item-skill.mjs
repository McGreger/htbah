import HtbahItemBase from './base-item.mjs';

export default class HtbahSkill extends HtbahItemBase {
    static LOCALIZATION_PREFIXES = [
      'HTBAH.Item.base',
      'HTBAH.Item.Skill',
    ];
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {
            set: new fields.StringField({ initial: "phy"}),
            ranks: new fields.NumberField({ initial: 0 })
        }
    return schema;
    }
}