import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from "@angular/core";
import { dungeoneerSchema } from "dungeoneer-common";
import { Schema } from "dungeoneer-common/dist/types/src/schema/schemaTypes";
import { DmUnsubscriberComponent } from "../core/dm-unsubscriber/dm-unsubscriber.component";
import { DmFormEditService } from "../form/dm-form-edit/dm-form-edit.service";

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

    constructor(protected formEditService: DmFormEditService, private changeDetectorRef: ChangeDetectorRef) {
        super();
    }
    
    public onCharacterChange(characterID: string | null, character: any): void {
        this.characterID = characterID;
        this.character = character;

        this.changeDetectorRef.detectChanges();
    }
}