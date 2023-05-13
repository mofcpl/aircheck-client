interface indexLevel {
    id: number;
    indexLevelName: string;
}

export interface Summary {
    id: number;
    stCalcDate: string;
    stIndexCrParam: string;
    stIndexLevel: indexLevel;
    stIndexStatus: boolean;
    stSourceDataDate: string;
}