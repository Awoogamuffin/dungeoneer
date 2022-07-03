import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
import { dungeoneerSchema } from "dungeoneer-common";
import { Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
import { DmUnsubscriberComponent } from "../core/dm-unsubscriber/dm-unsubscriber.component";
import { DmFormEditService } from "../form/dm-form-edit/dm-form-edit.service";
import { CreatureStats } from "./model/creature-stats.model";

@Component({
    selector: 'abstractCharacter',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class DmAbstractCharacterComponent extends DmUnsubscriberComponent {
    protected readonly NODE_TYPE = 'character';

    @Input() characterID!: string | null;
    @Input() character!: any;

    schema: Schema = dungeoneerSchema;

    characterStats: CreatureStats;

    constructor(protected formEditService: DmFormEditService, private changeDetectorRef: ChangeDetectorRef) {
        super();

        this.characterStats = new CreatureStats();
    }
    
    /**
     * Update the reference to the stored character details.
     * 
     * @param characterID 
     * @param character 
     */
    public onCharacterChange(characterID: string | null, character: any): void {
        this.characterID = characterID;
        this.character = character;

        this.characterStats.character = this.character;

        this.changeDetectorRef.detectChanges();
    }
}