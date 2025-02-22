pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Check out your GitHub repository
                git 'https://github.com/Saisamarth21/React-todo.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build the image tagged for Docker Hub
                sh 'docker build -t saisamarth21/react-todo:latest .'
            }
        }
        stage('Docker Login & Push') {
            steps {
                // Bind Docker Hub credentials and push the image
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USR', passwordVariable: 'DOCKERHUB_PSW')]) {
                    sh '''
                      echo "$DOCKERHUB_PSW" | docker login --username "$DOCKERHUB_USR" --password-stdin
                      docker push saisamarth21/react-todo:latest
                    '''
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                // Bind the kubeconfig file credential to deploy to Kubernetes
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                      kubectl apply -f react-dpl.yml
                      kubectl rollout status deployment/react-todo-deployment
                    '''
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
