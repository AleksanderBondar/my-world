import chalk from 'chalk';

type Colors = keyof Pick<
    typeof chalk,
    | 'bgBlue'
    | 'bgBlueBright'
    | 'bgGreen'
    | 'bgMagenta'
    | 'bgRed'
    | 'bgRedBright'
    | 'bgYellow'
    | 'blue'
    | 'blueBright'
    | 'green'
    | 'greenBright'
    | 'magenta'
    | 'red'
    | 'redBright'
    | 'yellow'
    | 'yellowBright'
>;

export const log = ({
    message,
    fromClient = false,
    color = 'yellow',
}: {
    message: string;
    fromClient?: boolean;
    color?: Colors;
}) => {
    console.log(
        chalk[!fromClient ? 'green' : 'blue'](!fromClient ? '[SERVER]' : '[CLIENT]') + ' ' + chalk[color](message),
    );
};
