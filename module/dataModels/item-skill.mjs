import HtbahItemBase from "./base-item.mjs";

export default class HtbahSkill extends HtbahItemBase {
    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = {
            set: new fields.StringField({ initial: "phy"})
        }
    return schema;
    }
}