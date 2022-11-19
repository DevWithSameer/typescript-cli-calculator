#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';

let playerName: string;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const welcome = async () => {
    const rainbowTitle = chalkAnimation.rainbow(
        `Are you here to use the TypeScript Calculator?
        Created by Sameer Ahmed\n`
    );

    await sleep();
    rainbowTitle.stop();
}

const askName = async () => {
    const answers = await inquirer.prompt({
        name: 'user_name',
        type: 'input',
        message: 'What is your name? ',
        default() {
            return 'User';
        },
    });

    playerName = answers.user_name;
}

console.clear();
await welcome();
await askName();

let continueOp;

do {

    const question = async () => {
        const operators = await inquirer.prompt([
            {
                name: 'choose_operations',
                type: 'list',
                message: 'Please use Arrow key to Select your option!\n',
                choices: [
                    'Addition',
                    'Subtraction',
                    'Multiplication',
                    'Division',
                    'Modulus',
                    'Power',
                ],
            },
            {
                name: 'numberOne',
                type: 'number',
                message: 'First Number? ',
                default() {
                    return 0;
                },
            },
            {
                name: 'numberTwo',
                type: 'number',
                message: 'Second Number? ',
                default() {
                    return 0;
                },
            },

        ]);

        return handleAnswer(operators.choose_operations, operators.numberOne, operators.numberTwo);
    }

    const handleAnswer = async (isOperator: string, number1: number, number2: number) => {
        const spinner = createSpinner('Calculating...').start();
        await sleep();

        let result: number = 0;

        switch (isOperator) {
            case "Addition":
                result = number1 + number2;
                spinner.success({ text: `Your Answer is: ${chalk.bold.green(result)}` });
                break;
            case "Subtraction":
                result = number1 - number2;
                spinner.success({ text: `Your Answer is: ${chalk.bold.green(result)}` });
                break;
            case "Multiplication":
                result = number1 * number2;
                spinner.success({ text: `Your Answer is: ${chalk.bold.green(result)}` });
                break;
            case "Division":
                result = number1 / number2;
                spinner.success({ text: `Your Answer is: ${chalk.bold.green(result)}` });
                break;
            case "Modulus":
                result = number1 % number2;
                spinner.success({ text: `Your Answer is: ${chalk.bold.green(result)}` });
                break;
            case "Power":
                result = number1 ** number2;
                spinner.success({ text: `Your Answer is: ${chalk.bold.green(result)}` });
                break;
            default:
                return;
        }
    }

    const continueOperation = async () => {
        const choice = await inquirer.prompt({
            name: 'continue_Operation',
            type: 'confirm',
            message: 'Do you want to continue? ',
        });

        continueOp = choice.continue_Operation;
    }

    await question();
    await continueOperation();
    console.clear();

} while (continueOp == true);
