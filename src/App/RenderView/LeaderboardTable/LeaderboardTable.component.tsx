import { User } from "../../../types";

interface ILeaderboardTableProps {
  leaderboard: Array<User>;
}

export function LeaderboardTable({ leaderboard }: ILeaderboardTableProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Display name</th>
          <th>Top score</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map(user => (
          <tr key={user.id}>
            <td>{user.rank}</td>
            <td>{user.displayName}</td>
            <td>{user.topScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}