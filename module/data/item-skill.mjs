import HtbahItemBase from './base-item.mjs';

export default class HtbahSkill extends HtbahItemBase {
  static LOCALIZATION_PREFIXES = [
    'HTBAH.Item.base',
    'HTBAH.Item.Skill',
  ];
    
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();
    
    schema.set = new fields.StringField({ initial: 'phy' });
    schema.ranks = new fields.NumberField({ ...requiredInteger, initial: 0 });

  return schema;
  }
}