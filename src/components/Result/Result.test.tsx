import { screen } from "@testing-library/react";
import { makeTestStore, testRender } from "helpers/testUtils";
import { appendTypedHistory, setChar, setTime, setWord, setWordList } from "store/actions";
import Result from "./Result";


describe("Result", () => {
    
    it("should show the number of correct words", async() => {
        const store = makeTestStore();
        const type = localStorage.getItem("type") || "words";

        await import(`wordlists/${type}.json`).then((words) =>
            store.dispatch(setWordList(words.default))
        );
        const words = store.getState().word.wordList;

        await store.dispatch(setTime(10));
        await store.dispatch(setChar(words[0]))
        await store.dispatch(appendTypedHistory())
        await store.dispatch(setChar(words[1]))
        await store.dispatch(appendTypedHistory())
        await store.dispatch(setChar(words[2]))
        await store.dispatch(appendTypedHistory())
        await store.dispatch(setChar(words[3]))
        await store.dispatch(appendTypedHistory())


        testRender(<Result />, { store });
        expect(screen.getByTestId("correct").textContent).toEqual("Correct Words: 4")
        
    });

    it("should show the correct word as 0 when there is no typed word", async() => {
        const store = makeTestStore();
        const type = localStorage.getItem("type") || "words";

        await import(`wordlists/${type}.json`).then((words) =>
            store.dispatch(setWordList(words.default))
        );
        const words = store.getState().word.wordList;

        await store.dispatch(setTime(10));

        testRender(<Result />, { store });
        expect(screen.getByTestId("correct").textContent).toEqual("Correct Words: 0")
    })

    it("should show the correct word as 0 when user types an incorrect word", async() => {
        const store = makeTestStore();
        const type = localStorage.getItem("type") || "words";

        await import(`wordlists/${type}.json`).then((words) =>
            store.dispatch(setWordList(words.default))
        );
        const words = store.getState().word.wordList;

        await store.dispatch(setTime(10));
        await store.dispatch(setChar("mumbledword"))
        await store.dispatch(appendTypedHistory())

        testRender(<Result />, { store });
        expect(screen.getByTestId("correct").textContent).toEqual("Correct Words: 0")
    })

    it("should only show the number correct words when user types both correct and incorrect words", async() => {
        const store = makeTestStore();
        const type = localStorage.getItem("type") || "words";

        await import(`wordlists/${type}.json`).then((words) =>
            store.dispatch(setWordList(words.default))
        );
        const words = store.getState().word.wordList;

        await store.dispatch(setTime(10));
        await store.dispatch(setChar("mumbledword"))
        await store.dispatch(appendTypedHistory())
        await store.dispatch(setChar(words[1]))
        await store.dispatch(appendTypedHistory())
        await store.dispatch(setChar(words[2]))
        await store.dispatch(appendTypedHistory())
        await store.dispatch(setChar("mumbledword"))
        await store.dispatch(appendTypedHistory())

        testRender(<Result />, { store });
        expect(screen.getByTestId("correct").textContent).toEqual("Correct Words: 2")
    })

});

