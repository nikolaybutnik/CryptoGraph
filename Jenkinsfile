pipeline{
    agent any

    tools {nodejs "nodejs"}
    
    stages{
        stage("Build"){
            steps{
                echo "========Installing dependencies========"
                sh 'npm install'
            }
        }
    }
}