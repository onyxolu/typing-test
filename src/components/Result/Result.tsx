import { resetTest } from "helpers/resetTest";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Result.scss";

export default function Result() {
    const {
        word: { wordList, typedHistory, currWord },
        preferences: { timeLimit },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    result.forEach((r, idx) => {
        if (r) correctChars += wordList[idx].length;
    });
    console.log("result", result)
    console.log(correctChars, spaces, timeLimit)
    const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;
    return (
        <div className="result">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2} align="center">
                            <h1 data-testid="wpm">{Math.round(wpm) + " wpm"}</h1>
                        </td>
                    </tr>
                    <tr>
                        <th data-testid="correct">Correct Words: {result.filter((x) => x).length}</th>
                        {/* <td>{result.filter((x) => x).length}</td> */}
                    </tr>
                    <tr className="wrong">
                        <th>Incorrect Words:</th>
                        <td>{result.filter((x) => !x).length}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center">
                            <button onClick={() => resetTest()}>Restart</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
