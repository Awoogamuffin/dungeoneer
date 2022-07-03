/**
 * Wrapper class to hold both the editable properties of a character or creature (e.g. name, level, abilities)
 * and the calculated properties derived from them (e.g. skills, armour class, initiative)
 */
export class CreatureStats {
    // The schema character node
    private _character: any;

    /**
     * Getter for character from schema node.
     */
    get character(): any {
        return this._character;
    }

    // Calculated stats
    profiencyBonus = 2;

    /**
     * Setter for character from schema node.
     * When changed, update calculated properties
     */
    set character(characterToSet: any) {
        this._character = characterToSet;

        this.updateCalculatedStats();
    }

    /**
     * Calculate all the statistics that are derived from the values stored in the character object.
     */
    public updateCalculatedStats(): void {
        this.profiencyBonus = 1 + Math.ceil(this.character.character_level / 4);
    }

}