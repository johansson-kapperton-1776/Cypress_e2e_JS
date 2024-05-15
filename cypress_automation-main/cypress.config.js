const { defineConfig } = require("cypress");
const mysql = require("mysql");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
	require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
	require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = defineConfig({
	e2e: {
		async setupNodeEvents(on, config) {
			const bundler = createBundler({
				plugins: [createEsbuildPlugin(config)],
			});
			// db connection
			on("task", {
				queryDb: (query) => {
					console.log(query);
					return queryTestDb(query, config)
				},
			});
			on("file:preprocessor", bundler);
			await addCucumberPreprocessorPlugin(on, config);

			return config;
		},
		"env": {
			"db": {
				"server": '127.0.0.1',
				user: "root",
				password: "root",
				database: "productDetails"
			}
		},
		retries: {
			experimentalStrategy: 'detect-flake-and-pass-on-threshold',
			experimentalOptions: {
				maxRetries: 2,
				passesRequired: 2,
			},
			openMode: true,
			runMode: true,
		},
		baseUrl: 'https://automationexercise.com/',
		specPattern: 'src/feature/*.feature',
		fixturesFolder: 'src/fixtures',
		redirectionLimit: 50,
		chromeWebSecurity: true,
		defaultCommandTimeout: 70000,
		execTimeout: 60000,
		pageLoadTimeout: 60000,
		viewportHeight: 720,
		viewportWidth: 1280,
	},
});

function queryTestDb(query, config) {
	// creates a new mysql connection using credentials from cypress.json
	const connection = mysql.createConnection(config.env.db);
	// start connection to db
	connection.connect();
	// exec query + disconnect to db as a promise
	return new Promise((resolve, reject) => {
		connection.query(query, (error, results) => {
			if (error) reject(error);
			else {
				connection.end();
				// console log results
				return resolve(results);
			}
		});
	});
}
