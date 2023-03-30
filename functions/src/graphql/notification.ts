import {gql} from "@urql/core";
import {client} from "./client";

export const INSERT_NOTIFICATION = gql`
    mutation ($objects: [notification_insert_input!]!) {
        insert_notification (
            objects: $objects
        ) {
            affected_rows
            returning {
                addr
            }
        }
    }
`;

export const GET_NOTIFICATION = gql`
  query GetNotification($addr: String!) {
    notification(where: {
        addr: { _eq: $addr }
    }) {
        addr
        token
    }
}
`;

export interface Notification {
  addr: string,
  token?: string,
}

export async function insertNotification(
    inputs: Notification[]
) : Promise<{id: number}[]> {
  const result = await client().mutation(
      INSERT_NOTIFICATION,
      {objects: inputs.map((i) => ({
        addr: i.addr,
        token: i.token,
      }))}
  ).toPromise();
  return result.data.insert_notification.returning;
}

export async function getNotification(
    addr: string
) : Promise<Notification | undefined> {
  const result = await client().query(
      GET_NOTIFICATION,
      {addr: addr}
  ).toPromise();
  if (result.error) {
    console.log("Failed to get notification info", result.error);
    return undefined;
  }

  const notification = result.data?.notification;
  if (notification === undefined || notification.length < 1) {
    console.log("Empty notification data", notification);
    return undefined;
  }

  return {
    addr: notification[0].addr,
    token: notification[0].token,
  };
}
