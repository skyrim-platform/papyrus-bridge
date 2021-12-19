const fs = require('fs')
const path = require('path')
const { stringify } = require('querystring')

let config = {}
const configFileName = "skyrimplatform.config.json"
const configFilePath = path.join('.', configFileName)
const exampleConfigFileName = "example-skyrimplatform.config.json"
const exampleConfigFilePath = path.join('.', exampleConfigFileName)
const typeScriptConfigTemplateName = 'tsconfig.template.json'
const typeScriptConfigTemplatePath = path.join('scripts', typeScriptConfigTemplateName)

function logInfo(message) {
    console.log(`[Skyrim Platform] ${message}`)
    return false
}

function logError(message) {
    console.error(`[Skyrim Platform] ${message}`)
    return false
}

function logWarning(message) {
    console.warn(`[Skyrim Platform] ${message}`)
    return false
}

function validateConfig(force = false) {
    // Verify that skyrimplatform.config.json has been configured
    if (!fs.existsSync(configFilePath)) {
        if (fs.existsSync(exampleConfigFilePath)) {
            return logError(`Project not configured. Please copy ${exampleConfigFileName} to ${configFileName} and edit to configure.`)
        } else {
            return logError(`Project not configured. Please create a ${configFileName} file and edit to configure. (A ${exampleConfigFileName} file should have been distributed with this project template?)`)
        }
    }

    // Read the file with the Skyrim Platform plugin configuration
    try {
        config = require(path.join('..', configFilePath)) // `require` is relative to the script
    } catch (e) {
        return logError(`Failed to load config file ${configFileName}.\nError: ${e.message}`)
    }

    // Verify valid project type
    projectType = config.type
    if (!['module', 'plugin'].includes(projectType))
        return logError(`Unknown project type: '${projectType}'. Valid types: 'plugin', 'module'.`)


    // See if the configured "imports" exists
    if (!fs.existsSync(config.imports))
        logWarning(`Imports folder not found: ${config.imports}`)

    // Finally, check for a name. Easier for folks than understanding package.json.
    if (!config.name)
        return logError(`Please set the 'name' field in ${configFileName} to the name of your plugin or module`)

    return true
}

function readConfiguration() {
    if (validateConfig())
        return config
}

function setupTypeScriptConfiguration() {
    if (!validateConfig()) return

    let tsconfigTemplate
    try {
        tsconfigTemplate = require(`./${typeScriptConfigTemplateName}`) // `require` is relative to the script
    } catch (e) {
        return logError(`Failed to load TypeScript configuration base file: ./${typeScriptConfigTemplateName}\n${e.message}`)
    }

    // Set the directory to find TypeScript modules to the Skyrim Folder\Data\Platform\Modules
    tsconfigTemplate.compilerOptions.baseUrl = config.imports

    // Set the package to output the resulting .js file to the ./dist fiolder (which will be deployed for plugin types)
    tsconfigTemplate.compilerOptions.outFile = path.join("./dist", `${config.name}.js`)

    // Write tsconfig.json with these configured values
    fs.writeFileSync('./tsconfig.json', JSON.stringify(tsconfigTemplate, null, 2))

    // Output message
    console.log('Configured TypeScript configuration for Skyrim Platform project')
}

function deployProject() {
    if (!validateConfig()) return

    const glob = require('glob')
    const deployFolder = config[config.type].deployFolder
    const sourceFileGlobs = config[config.type].sourceFiles
    const ignorePrefix = config[config.type].ignorePrefix
    sourceFileGlobs.forEach(pathMatcher => {
        const fileNames = glob.sync(pathMatcher)
        fileNames.forEach(filename => {
            let filepath = filename
            if (ignorePrefix) filepath = filepath.replace(ignorePrefix, '')
            const fullFileDeployPath = path.join(deployFolder, filepath)
            const fullFileDirectoryPath = path.dirname(fullFileDeployPath)
            if (!fs.existsSync(fullFileDirectoryPath)) fs.mkdirSync(fullFileDirectoryPath, { recursive: true })
            fs.copyFileSync(filename, fullFileDeployPath)
            logInfo(`Wrote ${fullFileDeployPath}`)
        })
    })
}

exports.validateConfig = validateConfig
exports.readConfiguration = readConfiguration
exports.setupTypeScriptConfiguration = setupTypeScriptConfiguration
exports.deployProject = deployProject
