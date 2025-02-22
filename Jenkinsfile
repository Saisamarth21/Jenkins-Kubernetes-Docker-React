pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Check out the 'main' branch from your GitHub repository
                git branch: 'main', url: 'https://github.com/Saisamarth21/React-todo.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t saisamarth21/react-todo:latest .'
                    } else {
                        bat 'docker build -t saisamarth21/react-todo:latest .'
                    }
                }
            }
        }
        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USR', passwordVariable: 'DOCKERHUB_PSW')]) {
                    script {
                        if (isUnix()) {
                            sh '''
                              echo "$DOCKERHUB_PSW" | docker login --username "$DOCKERHUB_USR" --password-stdin
                              docker push saisamarth21/react-todo:latest
                            '''
                        } else {
                            // On Windows, environment variables in a bat command are referenced with %VAR%
                            bat 'docker login --username %DOCKERHUB_USR% --password %DOCKERHUB_PSW%'
                            bat 'docker push saisamarth21/react-todo:latest'
                        }
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    script {
                        if (isUnix()) {
                            sh '''
                              kubectl apply -f react-dpl.yml
                              kubectl rollout status deployment/react-todo-deployment
                            '''
                        } else {
                            bat 'kubectl apply -f react-dpl.yml'
                            bat 'kubectl rollout status deployment/react-todo-deployment'
                        }
                    }
                }
            }
        }
    }
    post {
        failure {
            echo 'The pipeline failed.'
        }
        success {
            echo 'Deployment succeeded!'
        }
    }
}
