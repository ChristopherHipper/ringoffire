export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: { name: string; rotation: string }[] = [];
    public currentPlayer: number = 0;
    public id?: string;
    public currentCard: string | undefined = '';
    public pickCardAnimation: boolean = false;

    constructor() {
        this.createStack();
    };

    createStack() {
        for (let index = 1; index < 14; index++) {
            this.stack.push('clubs_' + index);
            this.stack.push('diamonds_' + index);
            this.stack.push('hearts_' + index);
            this.stack.push('spade_' + index);
        };
        this.shuffleStack(this.stack);
    };

    shuffleStack(arr: String[]) {
        arr.sort(() => Math.random() - 0.5);
    };
};